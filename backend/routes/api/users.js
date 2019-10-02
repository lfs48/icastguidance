const express = require("express");
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const router = express.Router();

router.post('/', (req, res) => {
    User.findOne({username: req.body.username})
    .then( user => {
        if (user) { 
            return res.status(422).json({error: "Username already registered"}) 
        } else {
            const newUser = new User({
                username: req.body.username
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password_digest = hash;
                    newUser.save()
                    .then(user => {
                        const payload = { id: user.id, username: user.username };
          
                        jwt.sign(payload, keys.jwtKey, { expiresIn: '7d' }, (err, token) => {
                          res.json({
                            success: true,
                            user: {id:user.id, username: user.username},
                            token: "Bearer " + token
                          });
                        });
                      })
                    .catch(err => console.log(err));
                })
            })
        }
    })
});

module.exports = router;