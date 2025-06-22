const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    number: String,
    password: String,
    state: String,
    district: String,
    taluk: String,
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    bills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bill' }]
})

module.exports = mongoose.model('User', userSchema)