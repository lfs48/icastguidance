const express = require("express");
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

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
              res.json({msg: 'Success'});
            } else {
              return res.status(400).json({password: 'Incorrect password'});
            }
          })
      })
});

module.exports = router;