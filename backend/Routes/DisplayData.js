const express = require('express');
const router = express.Router();

// Define the foodData route
router.post('/foodData', (req, res) => {
    try {
        // Check if global variables are defined
        if (!global.food_items || !global.food_categories) {
            return res.status(500).json({ error: "Food data is not available" });
        }

        // Send both global variables in a single response object
        res.status(200).json({
            food_items: global.food_items,
            food_categories: global.food_categories
        });
    } catch (error) {
        console.error(error.message); // Log the error message for debugging
        res.status(500).json({ error: "Server Error" }); // Send JSON response with error
    }
});

module.exports = router;
