import express from "express";
import { SpaceModel } from "../Model/SpaceModel.js";
import cookieParser from "cookie-parser";

const router = express.Router();
router.use(cookieParser());

/**
 * @route   GET /spaces
 * @desc    Get all parking spaces
 */
router.get("/", async (req, res) => {
    try {
        const spaces = await SpaceModel.find();
        res.status(200).json(spaces);
    } catch (error) {
        res.status(500).json({ message: "Error fetching spaces", error });
    }
});

/**
 * @route   GET /spaces/:id
 * @desc    Get a single parking space by ID
 */
router.get("/:id", async (req, res) => {
    try {
        const space = await SpaceModel.findById(req.params.id);
        if (!space) return res.status(404).json({ message: "Space not found" });

        res.status(200).json(space);
    } catch (error) {
        res.status(500).json({ message: "Error fetching space", error });
    }
});

/**
 * @route   POST /spaces
 * @desc    Add a new parking space
 */
router.post("/", async (req, res) => {
    try {
        const { user_name, address, latitude, longitude, parking_type, price_per_hour } = req.body;

        const newSpace = new SpaceModel({ user_name, address, latitude, longitude, parking_type, price_per_hour });
        await newSpace.save();

        res.status(201).json({ message: "Parking space added successfully!", newSpace });
    } catch (error) {
        res.status(500).json({ message: "Error adding space", error });
    }
});

/**
 * @route   PUT /spaces/:id
 * @desc    Update an existing parking space
 */
router.put("/:id", async (req, res) => {
    try {
        const updatedSpace = await SpaceModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedSpace) return res.status(404).json({ message: "Space not found" });

        res.status(200).json({ message: "Parking space updated successfully!", updatedSpace });
    } catch (error) {
        res.status(500).json({ message: "Error updating space", error });
    }
});

/**
 * @route   DELETE /spaces/:id
 * @desc    Delete a parking space
 */
router.delete("/:id", async (req, res) => {
    try {
        const deletedSpace = await SpaceModel.findByIdAndDelete(req.params.id);

        if (!deletedSpace) return res.status(404).json({ message: "Space not found" });

        res.status(200).json({ message: "Parking space deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting space", error });
    }
});

export { router as SpaceRouter };
