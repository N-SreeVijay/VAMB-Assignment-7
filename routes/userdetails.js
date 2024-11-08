// routes/userdetails.js
const express = require('express');
const User = require('../models/User');  // Import the User model
const router = express.Router();

// Change route path to /user/details
router.get('/dashboard', async (req, res) => {
    const email = req.query.email;

    try {
        // Fetch the user details from MongoDB
        const user = await User.findOne({ email });

        if (user) {
            return res.json({ success: true, user });
        } else {
            return res.json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({ success: false, message: 'Error fetching user data' });
    }
});

module.exports = router;
