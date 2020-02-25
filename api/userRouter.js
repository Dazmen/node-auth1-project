const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Users = require('./userModel.js');

router.post('/register', (req, res) => {
    const user = req.body
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Users.register(user)
        .then(newUser => {
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
router.get('/users', validateLogin, (req, res) => {
    Users.find()
        .then(list => {
            res.status(200).json(list)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: "could not retrieve users"})
        })
})

module.exports = router;

function validateLogin(req, res, next){
    const { username, password } = req.headers;
    if (username && password) {
        Users.findBy({username})
            .first()
            .then(valUser => {
                if(valUser && bcrypt.compareSync(password, valUser.password)){
                    next();
                } else {
                    res.status(401).json({error: 'Not logged in'})
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: "server could not retrieve user"})
            })
    } else {
        res.status(400).json({ error: 'please provide a valid username and password'})
    }
};