const express = require('express');
const fs = require('fs');
const router = express.Router();

// Handle user subscription
router.post('/', (req, res) => {
    const { name, mobile, email } = req.body;
    console.log(`Subscription request received from ${name} for the email: ${email}, mobile number: ${mobile}`);
    res.render('thankyou', { name, mobile, email });
});



module.exports = router;
