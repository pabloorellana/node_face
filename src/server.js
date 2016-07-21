var express = require('express')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var app = express();

//------- database initialization
require('mongoose').Promise = require('q').Promise;
mongoose.connect('mongodb://localhost:27017/mean-auth');

//------- setting express middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

//------- importing models
var Users = require('./database/users.js')
var Posts = require('./database/posts.js')

//------ controllers
app.get('/users', function (req, res) {
  Users.find().then(function (result) {
    res.send(result)
  }).catch(function (err) {
    console.log(err)
  })
});

app.get('/users/:userId', function (req, res) {
  var userId = req.params.userId;
  Users.findOne({_id: userId}).then(function (result) {
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

  Users.findByIdAndUpdate(userId, req.body, {new: true}).then(function (result) {
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
  var threeDaysAgo = new Date()
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)

  var userId = req.params.userId
  var from = req.query.from || threeDaysAgo
  var to = req.query.to || new Date()

  Posts.find({userId: userId, createdAt: {"$gte": from, "$lt": to}})
    .then(function (result) {
      res.send(result)
    }).catch(function (err) {
      console.log(err)
    })
});

app.get('/users/:userId/posts/:postId', function (req, res) {
  var postId = req.params.postId
  Posts.findOne({_id: postId})
    .then(function (result) {
      res.send(result)
    }).catch(function (err) {
      console.log(err)
    })
});

app.post('/users/:userId/posts', function (req, res) {
  Posts.create(req.body)
    .then(function (result) {
      res.send(result)
    }).catch(function (err) {
      console.log(err)
    })
})

app.put('/users/:userId/posts/:postId', function (req, res) {
  var postId = req.params.postId

  Posts.findByIdAndUpdate(postId, req.body, {new: true})
    .then(function (result) {
      res.send(result)
    }).catch(function (err) {
      console.log(err)
    })
})

app.delete('/users/:userId/posts/:postId', function (req, res) {
  var postId = req.params.postId

  Posts.findByIdAndRemove(postId)
    .then(function (result) {
      res.send(result)
    }).catch(function (err) {
      console.log(err)
    })
})

//--------------------------------------------------------------
app.get('/posts/:postId/comments', function (req, res) {
  var postId = req.params.postId

  Posts.findOne({_id: postId})
    .then(function (result) {
        res.send(result.comments)
    }).catch(function (err) {
      console.log(err)
    })
})

app.post('/posts/:postId/comments', function (req, res) {
  var postId = req.params.postId

  Posts.findByIdAndUpdate(postId, {$push: {"comments": req.body } }, { new: true })
    .then(function (result) {
        res.send(result)
    }).catch(function (err) {
      console.log(err)
    })
})

app.put('/posts/:postId/comments/:commentId', function (req, res) {
  var postId = req.params.postId
  var commentId = req.params.commentId

  Posts.update({'comments._id': commentId }, { $set: { "comments.$.text": req.body.text } }, { new: true })
    .then(function (result) {
        res.send(result)
    }).catch(function (err) {
      console.log(err)
    })
})

app.delete('/posts/:postId/comments/:commentId', function (req, res) {
  var postId = req.params.postId
  var commentId = req.params.commentId

  Posts.findByIdAndUpdate(postId, {$pull: {"comments": { _id: commentId } } }, { new: true })
    .then(function (result) {
        res.send(result)
    }).catch(function (err) {
      console.log(err)
    })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});