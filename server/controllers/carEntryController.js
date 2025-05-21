const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getUserFromToken } = require("../middleware/auth.js");

const registerCarEntry = async (req, res) => {
  try {
    const user = getUserFromToken(req);
    if (user.role !== "ATTENDANT")
      return res.status(403).json({ message: "Unauthorized" });

    const { plateNumber, parkingCode } = req.body;

    // Check parking exists and has space
    const parking = await prisma.parking.findUnique({
      where: { code: parkingCode },
    });
    if (!parking || parking.spaces < 1)
      return res.status(400).json({ message: "Parking not available" });

    const ticket_id = Math.floor(Math.random() * 1000000); // simple ticket generator

    await prisma.carEntry.create({
      data: {
        plateNumber,
        parkingCode,
        entry_time: new Date(),
        ticket_id,
      },
    });

    await prisma.parking.update({
      where: { code: parkingCode },
      data: { spaces: { decrement: 1 } },
    });
    await prisma.log.create({
      data: {
        user_id: user.id,
        action: "Car Entry",
        details: {
          plateNumber,
          parkingCode,
          ticket_id,
        },
      },
    });

    res.json({ message: "Car entered", ticket_id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const exitCar = async (req, res) => {
  try {
    const user = getUserFromToken(req);
    if (user.role !== "ATTENDANT")
      return res.status(403).json({ message: "Unauthorized" });

    const { plateNumber } = req.body;

    const entry = await prisma.carEntry.findFirst({
      where: { plateNumber, exit_time: null },
    });

    if (!entry) return res.status(404).json({ message: "Entry not found" });

    const exitTime = new Date();
    const durationMs = exitTime - entry.entry_time;
    const durationHours = Math.ceil(durationMs / (1000 * 60 * 60));

    const parking = await prisma.parking.findUnique({
      where: { code: entry.parkingCode },
    });
    const fee = durationHours * parking.fee;

    await prisma.carEntry.update({
      where: { id: entry.id },
      data: {
        exit_time: exitTime,
        charge_amount: fee,
      },
    });

    await prisma.parking.update({
      where: { code: entry.parkingCode },
      data: { spaces: { increment: 1 } },
    });
    await prisma.log.create({
      data: {
        user_id: user.id,
        action: "Car Exit",
        details: {
          plateNumber,
          parkingCode: entry.parkingCode,
          durationHours,
          charge: fee,
        },
      },
    });

    res.json({ message: "Car exited", durationHours, charge: fee });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { exitCar, registerCarEntry };
