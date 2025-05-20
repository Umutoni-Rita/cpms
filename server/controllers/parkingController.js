const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// CREATE
const createParking = async (req, res) => {
  try {
    const { code, name, location, spaces, fee } = req.body;
    const parking = await prisma.parking.create({
      data: { code, name, location, spaces, fee }
    });
    //log the action
    await prisma.log.create({
        data: {
            action: "Creation of parking place",
            user_id: user.id,
            details: {name, location, code}
        }
    })
    res.status(201).json({ message: 'Parking created', data: parking });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL with PAGINATION
const getAllParking = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  try {
    const [data, total] = await Promise.all([
      prisma.parking.findMany({ skip, take: parseInt(limit) }),
      prisma.parking.count()
    ]);
    res.status(200).json({ data, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
const getParkingById = async (req, res) => {
  try {
    const parking = await prisma.parking.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!parking) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ data: parking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
const updateParking = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const update = req.body;
    const parking = await prisma.parking.update({
      where: { id },
      data: update
    });
    //log the action
    await prisma.log.create({
        data: {
            action: "Updating a parking place",
            user_id: user.id
        }
    })
    res.status(200).json({ message: 'Updated', data: parking });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
const deleteParking = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.parking.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {getAllParking, getParkingById, updateParking, deleteParking, createParking}