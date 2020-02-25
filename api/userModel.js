const db = require('../data/dbConfig.js');

module.exports = {
    find,
    register,
    findBy,
};

function findBy(username){
    return db('users')
        .select('id', 'username', 'password')
        .where(username)
};
function register(user){
    return db('users')
        .insert(user, 'id')
};
function find(){
    return db('users')
        .select('id', 'username', 'password')
};
