const express = require('express');
const userRouter = require('./api/userRouter');

const server = express();

server.use(express.json());

server.use('/api', userRouter);


const PORT = process.env.PORT || 5000;
server.listen(PORT , () => {
    console.log(`Server listening on port:${PORT}`)
});