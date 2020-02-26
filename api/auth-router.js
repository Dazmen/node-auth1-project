const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Users = require('./userModel.js');

// /api/auth

router.get('/users', (req, res) => {
    Users.find()
        .then(list => {
            res.status(200).json(list)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: "could not retrieve users"})
        })
});
router.get('/logout', (req, res) => {
    if(req.session){
        req.session.destroy(err => {
            if(err){
                res.status(500).json({ error: 'Sorry, we are having issues with our server and can not log you out at this moment' })
            } else {
                res.status(200).json({ msg: 'logged out'})
            }
        })
    } else {
        res.status(200).json({msg:'You are not logged in'})
    }
});

module.exports = router;

