const express = require('express');
const logger = require('morgan');
const db = require('./models');
const mongoo = require('mongoose');

const cors = require('cors')


const connectDB = async ()=>{

  const connectionStr = "mongodb+srv://wosenn5:Ethiopia2023@cluster0.tebvoup.mongodb.net/blog?retryWrites=true&w=majority";
//mongoo.connect('mongodb://localhost:27017/blog');
const conn = await mongoo.connect(connectionStr,{
  useNewUrlParser:true,
  useUnifiedTopology:true
});

if(conn){
  console.log('database connected')
}
}


connectDB();



const app = express();
const PORT = process.env.PORT || 9000;

// console.log(mongoo);

// middleware
app.use(express.urlencoded({extended: true})); // dinosaurtoy/ref=sr_1_1?crid=32USSU0830BG&keywords=dinosaur+toy&qid=1659563967&s=apparel&sprefix=dinosaur+to%2Cfashion-mens%2C151&sr=1-1
app.use(express.json()); // allows the data in post/put to be parsed and understood by server
app.use(logger('dev')); //setups logging in dev only
app.use(express.static('public')); // basically looks in param before actual routes, will change later cuz we dont wanna use public
app.use(express.json())

// get creates/listens routes to first parameter name and responses to the route
app.get('/api/posts', async (req, res) => {
  // console.log('hit the route ciz we wanna verify we jhit prroperly');
  // console.log(req.url);
  const posts = await db.Post.find().populate('community'); //populate is good to translate hashed values to actual values
  //db.Post.create()
  console.log(posts);
  res.send('a message');
});


//
app.get('/api/communities',async (req,res)=>{

  const communities = await db.Community.find();
  console.log(communities);
  res.send(communities)
})

app.post('/api/communities', async (req,res)=>{

  const result = await db.Community.create(req.body);
  
  res.send('community is created')

})
app.listen(PORT, () => {
  console.log('server now listening');
});

