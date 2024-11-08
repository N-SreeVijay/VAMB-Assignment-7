const express = require('express');
const Donation = require('../models/Donation');  
const router = express.Router();

// Route to handle donations
router.post('/donate', async (req, res) => {
    const { name, email, amount } = req.body;

    try {
        // Create a new donation record
        const newDonation = new Donation({ name, email, amount });

        // Save it to MongoDB
        await newDonation.save();

        console.log(`Donation Amount received from ${name} of the Amount: ${amount}, E-MAIL: ${email}`);
        res.render('thankyou', { name, email, amount });
    } catch (error) {
        console.error('Error saving donation:', error);
        res.status(500).send('An error occurred while processing your donation');
    }
});

module.exports = router;
