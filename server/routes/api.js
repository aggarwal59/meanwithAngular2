const express = require('express');
const router = express.Router();
var mongoose = require('mongoose'); 
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'my-uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({ storage: storage });

mongoose.connect("mongodb://localhost:27017");
// mongoose.connection.on('open', () => {
//   console.log('Connected to mongodb server.');
//   mongoose.connection.db.listCollections().toArray(function (err, names) {
//     console.log(names);
//    });
// })
// declare axios for making http requests
// const axios = require('axios');
// const API = 'https://jsonplaceholder.typicode.com';

/* GET api listing. */
schema = mongoose.Schema;
var postSchema = new schema({
  body:String,
  title:String
});
var todos = mongoose.model('post',postSchema);

router.get('/', (req, res) => {
  res.send('api works');
});

// Get all posts
router.get('/posts', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  todos.find({},function(err,todo){
    console.log(todo);
    res.json(todo);
  })
  
});

// add post
router.post('/addPost', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  todos.create({
    body:req.body.body,
    title:req.body.title
  },function(err,todo){
    console.log(todo);
     todos.find({},function(err,todoArray){
    //console.log(todo);
    res.json({ status: 'Post added',postArray: todoArray});
  })
    
  })
  
});

//upload File
var fs = require('fs');

router.post('/uploadData', upload.any(), function(req,res,next){
  //console.log(req.body);
        filePath = './'+req.files[0].path;
        var css = fs.readFileSync(filePath, 'base64');
         console.log('Uploade Successful ', req.files[0], req.body);
                            res.json({status:'Uploade Successful',file:req.files[0],data:css});
});

module.exports = router;
