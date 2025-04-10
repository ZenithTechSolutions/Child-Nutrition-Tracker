const express = require('express')
const router = express.Router()
const registerModel = require('../schema_model/registerModel.js')

router.post('/', async (req, res) => {
    try {
        const { name, number, password, state, district, taluk } = req.body;
        const user = await registerModel.findOne({ number })
        if (user) {
            return res.status(302).json({ Message: 'Account already exists. Please log in.' });
        }
        const registerData = new registerModel({ name, number, password, state, district, taluk })
        await registerData.save();
        res.status(201).json({ Message: 'Account created successfully' })
    }
    catch (err) {
        res.status(500).json({ Message: err })
    }
})

module.exports = router