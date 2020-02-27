function restricted(req, res, next){
    if(req.session && req.session.loggedIn){
        console.log(req.session);
        next();
    } else {
        res.status(401).json({ error: 'You have to be logged in to access this endpoint!' })
    }
};

module.exports = restricted;