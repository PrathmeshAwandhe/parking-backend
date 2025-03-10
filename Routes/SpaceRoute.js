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

router.post("/", async (req, res) => { 
    try {
        const { user_name, address, latitude, longitude, parking_type, price_per_hour } = req.body;

        // Validate required fields
        if (!user_name || !address || !latitude || !longitude || !price_per_hour) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // Convert price_per_hour to a number if it's a string
        const price = parseFloat(price_per_hour);
        if (isNaN(price) || price <= 0) {
            return res.status(400).json({ message: "Invalid price per hour!" });
        }

        // Validate parking type
        const validParkingTypes = ["2-wheeler", "4-wheeler"];
        if (!validParkingTypes.includes(parking_type)) {
            return res.status(400).json({ message: "Invalid parking type!" });
        }

        // Check if a space with the same latitude exists
        const existingSpace = await SpaceModel.findOne({ latitude: parseFloat(latitude) });

        if (existingSpace) {
            return res.status(400).json({ message: `A space with latitude ${latitude} already exists!` });
        }

        // Save to database
        const newSpace = new SpaceModel({ 
            user_name, 
            address,
            latitude: parseFloat(latitude), 
            longitude: parseFloat(longitude), 
            parking_type, 
            price_per_hour: parseFloat(price_per_hour) 
        });
        
        await newSpace.save();

        res.status(201).json({ message: "Parking space added successfully!", newSpace });
    } catch (error) {
        console.error("Error adding space:", error); // Log the complete error message
        res.status(500).json({ message: "Internal server error", error: error.message });
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
