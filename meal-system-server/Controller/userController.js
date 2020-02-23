const express = require('express'); 
const router = express.Router(); 
const mongoose = require('mongoose'); 
const User = require('../Model/user'); 
const bcrypt = require('bcrypt-nodejs'); 
const jwt = require('jsonwebtoken'); 

router.post('/signup', (req, res, next) => {
    let hashPasswod = bcrypt.hashSync(req.body.password);  

    const newUser = new User({
        userName: req.body.userName, 
        email: req.body.email, 
        password: hashPasswod
    }); 

    newUser
        .save()
        .then((result) => {
            const token = jwt.sign(
                {
                    email: result.email, 
                    id: result._id
                }, 
                "secretKey", 
                {
                    expiresIn: '1h'
                }
            );
            res.status(200).json({
                result: result, 
                token: token
            }); 
        })
        .catch((err) => {
            res.send(err.message); 
        }); 
}); 

router.post('/login', (req, res, next) => {
    User
        .findOne({email: req.body.email})
        .exec()
        .then((result) => {
            if (result) {
                if (bcrypt.compareSync(req.body.password, result.password)) {
                    const token = jwt.sign(
                        {
                            email: result.email, 
                            id: result._id
                        }, 
                        "secretKey", 
                        {
                            expiresIn: '1h'
                        }
                    );
                    res.status(200).json({
                        message: 'successfully logged in',
                        token: token
                    });
                } else {
                    res.status(401).json({
                        message: 'password not match'
                    })
                }
            } else {
                res.status(401).json({
                    message: 'no user found with this email'
                });
            }
        })
        .catch(err => res.send(err));
}); 

router.get('/', (req, res, next) => {
    res.json({
        message: 'this is user controller'
    }); 
}); 

module.exports = router;