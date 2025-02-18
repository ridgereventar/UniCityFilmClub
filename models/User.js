const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fname: {type: String, required: true}, 
    lname: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required:false, default: 'member'},
    phone: {type: String, required: false, default: "N/A"}
});

module.exports = User = mongoose.model('user', UserSchema);