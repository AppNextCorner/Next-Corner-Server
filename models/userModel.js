const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    lastName: {type: String, required: true},
    firstName: {type: String, required: true},
    phoneNumber: {type: Number, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;