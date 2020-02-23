const express = require('express'); 
const userController = require('./Controller/userController'); 
const mongoose = require('mongoose'); 
const uniqueValidator = require('mongoose-unique-validator'); 
const bodyparser = require('body-parser'); 
const cors = require('cors'); 

const app = express(); 

const PORT = process.env.PORT || 3000;

mongoose.connect(`mongodb+srv://shuvokhalid:shuvosct@cluster0-s9niu.mongodb.net/MealDb?retryWrites=true&w=majority`, (err) => {
    if (err) {
        console.log('error', err);
    } else {
        console.log('connected'); 
    }
})

app.use(cors());
app.use(bodyparser.json()); 
app.use(bodyparser.urlencoded()); 
app.use(express.json()); 
app.use(express.urlencoded()); 
app.use('/user', userController);  

app.get('/', (req, res, next) => {
    res.send("hello "); 
}); 
 
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`); 
})

