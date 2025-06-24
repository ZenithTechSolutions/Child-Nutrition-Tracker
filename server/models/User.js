import { Schema, model } from 'mongoose';

const userModel = new Schema({
    name: String,
    number: String,
    password: String,
    state: String,
    district: String,
    taluk: String,
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    bills: [{ type: Schema.Types.ObjectId, ref: 'Bill' }]
});

export default model('User', userModel);
