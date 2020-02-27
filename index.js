const express = require('express');
const session = require('express-session');
const KnexStore = require('connect-session-knex')(session);// remember to curry and pass the session

const userRouter = require('./api/userRouter');
const authRouter = require('./api/auth-router.js');
const restricted = require('./middleware/restricted.js');
const knex = require('./data/dbConfig.js'); // needed to store session

const server = express();

const sessionConfig = {
    name: 'Cookie',
    secret: 'shhhhhhh',
    resave: false,
    saveUninitialized: true, // false to be GDPR compliant
    cookie: {
        maxAge: 1000 * 60 * 15,
        secure: false, // only false for development, always true in production
        httpOnly: true, // true means JS can't touch the cookie
    },
    store: new KnexStore({
        knex,
        tablename: 'sessions',
        createtable: true,
        sidfieldname: 'cookieId',
        clearInterval: 1000 * 60 * 15
    })
};
server.use(express.json());
server.use(session(sessionConfig))

server.use('/api', userRouter);
server.use('/api/auth', restricted, authRouter);


const PORT = process.env.PORT || 5000;
server.listen(PORT , () => {
    console.log(`Server listening on port:${PORT}`)
});