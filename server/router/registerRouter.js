const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const registerModel = require('../schema_model/registerModel.js')

export const register = async (req, res) => {
    const { number, password } = req.body;
    try {
        const user = await registerModel.findOne({ number });
        if (!user) {
            return res.status(404).json({ message: 'Phone number not exists! Please register' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch === false) {
            return res.status(401).json({ message: 'Incorrect password' })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'None',
            maxAge: 60 * 60 * 1000
        })
        res.status(200).json({ message: 'Login successful' })
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', err: err.message })
    }
  };
