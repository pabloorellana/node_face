var express = require('express')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var app = express();

var Users = require('./database/users.js')
var Posts = require('./database/posts.js')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

/*
{
  id: number
  name: string,
  email: string,
  birthday: date
}
 */

var users = [];

app.get('/users', function (req, res) {
  Users.find().then(function (result) {
    res.send(result)
  }).catch(function (err) {
    console.log(err)
  })
});

app.get('/users/:userId', function (req, res) {
  var userId = req.params.userId;
  Users.findOne({id: userId}).then(function (result) {
    res.send(result)
  }).catch(function (err) {
    console.log(err)
  })
});

app.post('/users', function (req, res) {
  Users.create(req.body).then(function (result) {
    res.send(result)
  }).catch(function (err) {
    console.log(err)
  })
})

app.put('/users/:userId', function (req, res) {
  var userId = req.params.userId;

  Users.findByIdAndUpdate(userId, req.body).then(function (result) {
    res.send(result)
  }).catch(function (err) {
    console.log(err)
  })
})

app.delete('/users/:userId', function (req, res) {
  var userId = req.params.userId;

  Users.findByIdAndRemove(userId).then(function (result) {
    res.send(result)
  }).catch(function (err) {
    console.log(err)
  })
})


//--------------------------------------------------------------
app.get('/users/:userId/posts', function (req, res) {
  var userId = req.params.userId;
  Posts.find({userId: userId}).then(function (result) {
    res.send(result)
  }).catch(function (err) {
    console.log(err)
  })
});

app.post('/users/:userId/posts', function (req, res) {
  Posts.create(req.body).then(function (result) {
    res.send(result)
  }).catch(function (err) {
    console.log(err)
  })
})

app.put('/users/:userId/posts/:postId', function (req, res) {
  var postId = req.params.postId;

  Post.findByIdAndUpdate(postId, req.body).then(function (result) {
    res.send(result)
  }).catch(function (err) {
    console.log(err)
  })
})

app.delete('/users/:userId/posts/:postId', function (req, res) {
  var postId = req.params.postId;

  Posts.findByIdAndRemove(postId).then(function (result) {
    res.send(result)
  }).catch(function (err) {
    console.log(err)
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});