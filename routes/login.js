const express = require('express');
const User = require('../models/User'); // Import the User model

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Look up the user in MongoDB
        const user = await User.findOne({ email, password });

        if (user) {
            req.session.Name = user.name; // Set the name in the session
            res.redirect('/userindex'); // Redirect to user index page
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (err) {
        res.status(500).send('Error logging in');
    }
});

module.exports = router;
