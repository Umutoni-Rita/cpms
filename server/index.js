const express = require("express");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const authRoutes = require("./routes/authRoutes");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({ origin: "http://localhost:5173" })); // accept requests only from the frontend
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to VMS");
});
app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/vehicle", vehicleRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(PORT, () => {
  console.log(`VMS listening on http://localhost:${PORT}`);
});
