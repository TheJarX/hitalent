const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: [true, 'Email taken'] },
    phone: { type: String, required: true, unique: [true, 'Phone taken'] },
    gender: { type: String, enum: ['Masculino', 'Femenino', 'Otro', 'Prefiero no decirlo'] },
    birthday: { type: Date, required: false },
    token: String,
});

module.exports = model('User', userSchema);