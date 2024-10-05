const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust path as necessary
const jwtSecret = "HaHa";

// Create User
router.post('/createuser', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, location } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            password: securePass,
            email,
            location
        });

        const data = {
            user: { id: user.id }
        };
        const authToken = jwt.sign(data, jwtSecret);
        res.json({ success: true, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// Login User
router.post('/login', [
    body('email').isEmail(),
    body('password').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const pwdCompare = await bcrypt.compare(password, user.password);
        if (!pwdCompare) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const data = {
            user: { id: user.id }
        };
        const authToken = jwt.sign(data, jwtSecret);
        res.json({ success: true, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;
