const db = require('../data/db-config');


module.exports = {
    find,
    findById,
    findPosts,
    add,
    update,
    remove

};

function find() {
    return db('users');
}

// a single user OR null
function findById(id) {
    return db('users').where({ id }).first();
}

  // SELECT p.id, p.contents, u.username FROM posts as p
  // JOIN users as u ON p.user_id = u.id;
function findPosts(user_id) {
    return db('posts as p')
    .join('users as u', 'u.id', 'p.user_id')
    .select('p.id', 'p.contents', 'u.username')
    .where({ user_id })
}

// resolves to newly created user 
function add(user) {
    return db('users').insert(user)
    .then(ids => {
        return findById(ids[0]);
    });
}
// resolves to updated user
function update(changes, id) {
   return db('users').where({ id }).update(changes)
   .then(count => {
       return findById(id);
   });
}
// resolves to a count
function remove() {
   return db('users').where({ id }).del();
}