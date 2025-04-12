const express = require('express')
const router = express.Router()
const registerModel = require("../schema_model/registerModel");

router.post('/login', async (requestAnimationFrame, res) => {
    const { number, password } = req.body;
    try {
        const user = await registerModel.findOne({ number });
        if (!user) {
            return res.status(404).json({ Message: 'Invalid phone number' })
        }
        if (user.password != password) {
            return res.status(401).json({ Message: 'Incorrect password' })
        }
        res.status(200).json({ Message: 'Login successful' })
    }
    catch (err) {
        res.status(500).json({ Message: 'Server error' })
    }
})

module.exports = router