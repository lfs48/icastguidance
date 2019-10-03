const express = require("express");
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const router = express.Router();

router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    User.findOne({username})
      .then(user => {
        if (!user) {
          return res.status(404).json({error: 'This user does not exist'});
        }
  
        bcrypt.compare(password, user.password_digest)
          .then(isMatch => {
            if (isMatch) {
                const payload = {id: user.id, name: user.name};
                jwt.sign(
                    payload,
                    keys.jwtKey,
                    {expiresIn: '7d'},
                    (err, token) => {
                        res.json({
                            success: true,
                            user: {id: user.id, username: user.username},
                            token: 'Bearer ' + token
                        });
                    }
                );
            } else {
              return res.status(400).json({password: 'Incorrect password'});
            }
          })
      })
});

module.exports = router;