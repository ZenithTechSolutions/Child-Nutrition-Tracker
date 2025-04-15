const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const registerModel = require('../schema_model/registerModel.js')

router.post('/register', async (req, res) => {
    try {
        const { name, number, password, state, district, taluk } = req.body;
        const user = await registerModel.findOne({ number })
        if (user) {
            return res.status(302).json({ Message: 'Account already exists. Please log in.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new registerModel({ name, number, password : hashedPassword, state, district, taluk })
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'None',
            maxAge: 60 * 60 * 1000
        })
        res.status(201).json({ message: 'Registration successful' })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' })
    }
})

module.exports = router