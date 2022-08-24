const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const db = require('./models');
const router = express.Router();
const mongoo = require('mongoose');

mongoo.connect(process.env.CONNSTRING)
//mongoo.connect('mongodb://localhost:27017/blog');

const app = express();
const PORT = process.env.PORT || 9000;

// middleware
app.use(express.urlencoded({extended: true})); // dinosaurtoy/ref=sr_1_1?crid=32USSU0830BG&keywords=dinosaur+toy&qid=1659563967&s=apparel&sprefix=dinosaur+to%2Cfashion-mens%2C151&sr=1-1
app.use(express.json()); // allows the data in post/put to be parsed and understood by server
app.use(logger('dev')); //setups logging in dev only
app.use(express.static('public')); // basically looks in param before actual routes, will change later cuz we dont wanna use public
app.use(cors());

// get creates/listens routes to first parameter name and responses to the route
app.get('/api/posts', async (req, res) => {
  try{
    const posts = await db.Post.find();
    res.send(posts);
  } catch(err) {
    console.log(err);
    res.status(400).json({message: err.message});
  };
});

app.get('/api/posts/:id', async (req, res) => {
  try{
    // if obj not found else 404
    const findPost = await db.Post.findOne({
      _id: req.params.id,
    });
    res.send(findPost);
  } catch(err) {
    console.log(err);
    res.status(400).json({message: err.message});
  };
});

app.get('/api/communities', async (req, res) => {
  try{
    const communities = await db.Community.find();
    res.send(communities);
  } catch(err) {
    console.log(err);
    res.status(400).json({message: err.message});
  };
});

app.get('/api/comments', async (req, res) => {
  try{
    const comments = await db.Comment.find();
    res.send(comments);
  } catch(err) {
    console.log(err);
    res.status(400).json({message: err.message});
  };
});

app.get('/api/profiles', async (req, res) => {
  try{
    const profiles = await db.Profile.find();
    res.send(profiles);
  } catch(err) {
    console.log(err);
    res.status(400).json({message: err.message});
  };
});

app.post('/api/communities', async (req, res) => {
  const comm = new db.Community(req.body);
  try{
    const dbComm = await comm.save();
    res.send(dbComm);
  } catch(err) {
    console.log(err);
    res.status(400).json({message: err.message});
  };
});

app.post('/api/posts', async (req, res) => {
  const newPost = new db.Post(req.body);
  try {
    const dbPost = await newPost.save();
    res.send(dbPost);
  } catch(err) {
    console.log(err);
    res.status(400).json({message: err.message});
  };
});

app.delete('/api/posts/:id', async (req, res) => {
  try{
    const data = await db.Post.findOneAndDelete({
      _id: req.params.id,
    });
    res.end(); // !!!!!!, basically assure that we have a *response method to terminate the request cycle*
  } catch(err) {
    console.log(err);
    res.status(400).json({message: err.message});
  };
});

app.put('/api/posts/:id', async (req, res) => {
  const findPost = { _id:req.params.id };
  const postUpdate = req.body;
  try{
    const data = await db.Post.findOneAndUpdate(
      findPost,
      postUpdate,
      {new: true},
    );
    res.send(data);
  } catch(err){
    console.log(err);
    res.status(400).json({message: err.message});
  };
});

app.listen(PORT, () => {
  console.log('server now listening');
});
