const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const db = require('./models');
const CommunityTest = require('./models/Community');
const router = express.Router();
const mongoo = require('mongoose');
mongoo.connect('mongodb://localhost:27017/blog');

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
  // console.log('hit the route ciz we wanna verify we jhit prroperly');
  // console.log(req.url);
  const posts = await db.Post.find().populate('community'); //populate is good to translate hashed values to actual values
  //db.Post.create()
  // add try catches
  console.log(posts);
  res.send(posts);
});

app.get('/api/communities', async (req, res) => {
  const communities = await db.Community.find();
  // add try catches, bareminimum add console.log for errors in routes
  console.log(communities);
  res.send(communities);
});

app.get('/api/comments', async (req, res) => {
  const comments = await db.Comment.find();
  res.send(comments);
});

app.get('/api/profiles', async (req, res) => {
  const profiles = await db.Profile.find();
  res.send(profiles);
});

app.post('/api/communities', async (req, res) => {
  const comm = new db.Community({
    name: req.body.name,
  })
  await comm.save();
  res.send(comm);
});

app.listen(PORT, () => {
  console.log('server now listening');
});