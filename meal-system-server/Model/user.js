const mongoose = require('mongoose'); 
const uniqeValidator = require('mongoose-unique-validator'); 

const userSchema = new mongoose.Schema({
    userName: {
        type: String, 
        required: true,  
        validate: {
            validator: (v) => {
                return !(v == 'admin'); 
            }, 
            message: 'user name will not be admin put another'
        }
    }, 
    email: {
        type: String, 
        required: true, 
        unique: true, 
        validate: {
            validator: (v) => {
                return /[^@]+@[^@]+\.[a-zA-Z]{2,6}/.test(v);
            }, 
            message: 'email is not valid '
        }
    }, 
    password: {
        type: String, 
        required: true
    }
});

userSchema.plugin(uniqeValidator); 

module.exports = mongoose.model('User', userSchema, '__user');