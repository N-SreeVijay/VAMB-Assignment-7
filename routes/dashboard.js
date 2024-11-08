const express = require('express');
const router = express.Router();
const Donation = require('../models/donations'); // Adjust the path to your Donation model

// Assuming you have some authentication middleware to set `req.user`
router.get('/dashboard', async (req, res) => {
    if (!req.session.email) {
        return res.redirect('/login'); 
    }

    try {
        // Retrieve user details by email
        const user = await User.findOne({ email: req.session.email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Retrieve donations related to the user's email
        const donations = await Donation.find({ email: req.session.email }).sort({ date: -1 }).limit(10);
        
        // Render the dashboard with user and donations data
        res.render('dashboard', { user, donations });
    } catch (error) {
        console.error('Error retrieving dashboard data:', error);
        res.status(500).send('Error loading dashboard');
    }
});

module.exports = router;
