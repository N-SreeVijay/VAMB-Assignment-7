// routes/usersubscriber.js
const express = require('express');
const Subscriber = require('../models/Subscriber'); // Import the Subscriber model
const router = express.Router();

// Handle user subscription
router.post('/', async (req, res) => {
    const { name, mobile, email } = req.body;

    try {
        // Create a new subscriber document
        const newSubscriber = new Subscriber({ name, mobile, email });
        
        // Save the subscriber to MongoDB
        await newSubscriber.save();
        
        console.log(`Subscription request received from ${name} for the email: ${email}, mobile number: ${mobile}`);
        res.render('thankyou', { name, mobile, email });
    } catch (error) {
        console.error('Error saving subscriber:', error);

        // Handle duplicate email error
        if (error.code === 11000) {
            return res.status(400).send('Email is already subscribed');
        }

        res.status(500).send('Error processing subscription');
    }
});

module.exports = router;
