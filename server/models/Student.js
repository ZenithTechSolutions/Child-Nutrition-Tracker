const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    dob: Date,
    doj: Date,
    age: Number,
    fathers_name: String,
    mothers_name: String,
    address: String,
    contact: String,
    measurements: [
        {
            date: { type: Date, default: Date.now },
            height: Number,
            weight: Number
        }
    ],
    attendance: [
        {
            date: { type: Date, default: Date.now },
            present: Boolean
        }
    ]
})

module.exports = mongoose.model('Student', studentSchema)