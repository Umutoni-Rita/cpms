const jwt = require('jsonwebtoken');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Middleware to protect routes by verifying JWT and attaching the user to req
const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header exists and follows "Bearer <token>" format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Decode and verify the JWT using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure token contains required fields
    if (!decoded.id || !decoded.role) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    // Fetch user from the database to make sure they exist
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    // Attach user info to the request object for later use
    req.user = user;
    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    // Catch-all for other token-related errors
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware to restrict access to specific user roles
const restrictTo = (...roles) => {
  return (req, res, next) => {
    // Check if user's role is allowed
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Not allowed" });
    }
    next();
  };
};


const getUserFromToken = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Missing or invalid Authorization header");
  }

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded.id || !decoded.role) {
    throw new Error("Invalid token payload");
  }

  return decoded;
};

module.exports = { protect, restrictTo, getUserFromToken };
