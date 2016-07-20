/*
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema   = new Schema({
    name: { type: String, required: true },    
    email: { type: String, required: true },
    birthday:  { type: Date, required: true }
});

module.exports = mongoose.model('User', UserSchema);
*/

var q = require('q');

var id = 1;
var users = [];


function create (user) {
  user.id = id
  users.push(user)

  id++;
  return q.resolve(user)
}

function find (params) {
  if (!params) {
    return q.resolve(users)
  }

  var result = users.filter(function (user) {
    var found = false;

    for(var param in params) {
      if (user[param] && user[param] == params[param]) {
        found =  true
      }
    }

    return found
  })

  return q.resolve(result)
}

function findOne (params) {

  var result = users.find(function (user) {
    var found = false;

    for(var param in params) {
      if (user[param] && user[param] == params[param]) {
        found =  true
      }
    }

    return found
  })

  return q.resolve(result)
}

function findByIdAndUpdate (userId, user) {
  var index = users.findIndex(function (u) {
    return u.id == userId
  })

  users[index] = user
  users[index].id = userId

  return q.resolve(users[index])
}

function findByIdAndRemove (userId) {
  var index = users.findIndex(function (u) {
    return u.id == userId
  })

  var userCopy = users[index]

  users.splice(index, 1)

  return q.resolve(userCopy)
}

module.exports = {
	create: create,
  find: find,
  findOne: findOne,
  findByIdAndUpdate: findByIdAndUpdate,
  findByIdAndRemove: findByIdAndRemove
}
