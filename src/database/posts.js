/*var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema   = new Schema({
    description: { type: String, required: true },
    createdAt:  { type: Date, default: Date.now },
    userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Post', PostSchema);*/
var q = require('q');

var id = 1;
var posts = [];


function create (post) {
  post.id = id
  posts.push(post)

  id++;
  return q.resolve(post)
}

function find (params) {
  if (!params) {
    return q.resolve(posts)
  }

  var result = posts.filter(function (post) {
    var found = false;

    for(var param in params) {
      if (post[param] && post[param] == params[param]) {
        found =  true
      }
    }

    return found
  })

  return q.resolve(result)
}

function findOne (params) {

  var result = posts.find(function (post) {
    var found = false;

    for(var param in params) {
      if (post[param] && post[param] == params[param]) {
        found =  true
      }
    }

    return found
  })

  return q.resolve(result)
}

function findByIdAndUpdate (postId, post) {
  var index = posts.findIndex(function (u) {
    return u.id == postId
  })

  posts[index] = post
  posts[index].id = postId

  return q.resolve(posts[index])
}

function findByIdAndRemove (postId) {
  var index = posts.findIndex(function (u) {
    return u.id == postId
  })

  var postCopy = posts[index]

  posts.splice(index, 1)

  return q.resolve(postCopy)
}

module.exports = {
  create: create,
  find: find,
  findOne: findOne,
  findByIdAndUpdate: findByIdAndUpdate,
  findByIdAndRemove: findByIdAndRemove
}

