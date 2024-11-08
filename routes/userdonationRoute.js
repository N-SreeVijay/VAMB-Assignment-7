const express = require('express');
const Donation = require('../models/Donation'); // Import the Donation model
const router = express.Router();

router.post('/donate', async (req, res) => {
    if (!req.session.Name) {
        return res.redirect('/login'); 
    }

    const { name, email, amount } = req.body;  // Include email in req.body

    if (!email || !amount || !name) {
        return res.status(400).send('Name, email, and amount are required');
    }

    try {
        // Create a new donation document
        const newDonation = new Donation({ name, email, amount });

        // Save the donation to MongoDB
        await newDonation.save();

        console.log(`Donation Amount received from ${name} (Email: ${email}) of Amount: $${amount}`);

        // Render a thank you page
        res.render('userthank-you', { name, email, amount });
    } catch (error) {
        console.error('Error saving donation:', error);
        res.status(500).send('Error processing donation');
    }
});

module.exports = router;
