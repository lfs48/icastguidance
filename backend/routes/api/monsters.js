const express = require("express");
const Monster = require('../../models/Monster');
const keys = require('../../config/keys');

const router = express.Router();

router.post('/', (req, res) => {
    const monster = new Monster({
        name: req.body.name,
        author: req.body.author,
        cr: req.body.cr,
        type: req.body.type,
        content: req.body.content
    });
    monster.save()
    .then(monster => {
        res.json({
            success: true,
            monster: monster
        });
    });
});

module.exports = router;