const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Users = require('./userModel.js');

// /api

router.post('/register', (req, res) => {
    const user = req.body
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Users.register(user)
        .then(newUser => {
            req.session.loggedIn = true;
            req.session.user = newUser.username;
            console.log(req.session)
            res.status(201).json(newUser)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: "could not reg"})
        })
});
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    Users.findBy({username})
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                req.session.loggedIn = true;
                req.session.user = user.username;
                console.log(req.session)
                res.status(200).json(user)
            } else {
                res.status(401).json({error: 'please provide valid log in info'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: "could not log in"})
        })
});

module.exports = router;

