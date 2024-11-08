const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Make sure this path is correct

// Route to display edit profile page
router.get('/edit-profile', (req, res) => {
    if (!req.session.Name) {
        return res.redirect('/login'); // Redirect if not logged in
    }

    // Find the user from the database based on session data
    User.findOne({ name: req.session.Name })
        .then(user => {
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.render('user/edit-profile', { user });
        })
        .catch(error => {
            console.error('Error fetching user:', error);
            res.status(500).send('Server Error');
        });
});

// Route to handle profile update on form submission
router.post('/edit-profile', (req, res) => {
    const { name, email, mobile, dob } = req.body;

    if (!req.session.Name) {
        return res.redirect('/login');
    }

    // Update the user's profile
    User.findOneAndUpdate({ name: req.session.Name }, { name, email, mobile, dob }, { new: true })
        .then(updatedUser => {
            res.redirect('/details'); // Redirect to the user's details page (or dashboard)
        })
        .catch(error => {
            console.error('Error updating user profile:', error);
            res.status(500).send('Server Error');
        });
});

module.exports = router;
