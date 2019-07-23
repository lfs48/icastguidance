const express = require("express");
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

const router = express.Router();

router.post('/', (req, res) => {
    User.findOne({username: req.body.username})
    .then( user => {
        if (user) { 
            return res.status(422).json({error: "Username already registered"}) 
        } else {
            const newUser = new User({
                username: req.body.username,
                session_token: Math.random().toString(36).substr(2, 9)
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password_digest = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                })
            })
        }
    })
});

module.exports = router;