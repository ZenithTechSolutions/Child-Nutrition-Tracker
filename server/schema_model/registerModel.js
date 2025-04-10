const mongoose = require('mongoose')

const registerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: Number, required: true },
    password: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    taluk: { type: String, required: true },
    registeredAt: { type: Date, default: Date.now, required: true }
})
const registerModel = mongoose.model("user_register_datas", registerSchema)

module.exports = registerModel