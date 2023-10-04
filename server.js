const express = require('express');
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const hbs = require("hbs");
const bodyParser = require('body-parser');

// const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// const MongoClient = mongodb.MongoClient;

// const uri = "mongodb+srv://preet_25:KGlxuO7SXzkDr8U@cluster0.cdk9bll.mongodb.net/Veer_Project?retryWrites=true&w=majority";
const port = process.env.PORT;
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const database = process.env.MONGODB_DATABASE;

const templatPath = path.join(__dirname,"/views");
console.log(templatPath);

app.set('view engine','hbs');
app.set('views',templatPath);


const uri = 'mongodb+srv://' + username + ':' + password + '@cluster0.cdk9bll.mongodb.net/' + database + '?retryWrites=true&w=majority';

let db;

// MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
//   if (err) {
//     console.error('Error connecting to MongoDB:', err);
//     return;
//   }

//   db = client.db('your_database_name');
//   console.log('Connected to MongoDB');

//   // Start your Express server here
//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//     console.log(`Link : ` + `localhost:${port}`);
//   });
// });

mongoose.connect(uri, { 
  useNewUrlParser: true,useUnifiedTopology:true }
  ).then(()=>{
    console.log("Connect Success..");
  }).catch((err)=>{
    console.log("Not Connect--> "+err);
});


// app.get('/api/data', async (req, res) => {
//     try {
//       const data = await database.collection('your_collection_name').find().toArray();
//       res.json(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });


app.get('/', (req, res) => {
  // res.send('Hello, World!');
  // console.log(__dirname + '/views/index.html');
  // res.sendFile(__dirname + '/views/index.html');
  res.render('index');
});

const buySchema = new mongoose.Schema({
  name: String,
  phone: String,
  grade: String,
  textbooks: String,
  compiled_papers: String
});

const sellSchema = new mongoose.Schema({
  name: String,
  phone: String,
  grade: String,
  textbooks: String,
  compiled_papers: String
});

const Buyers = mongoose.model('Buyers', buySchema);
const Sellers = mongoose.model('Sellers', sellSchema);

app.post('/buy',  (req, res) => {
  // Create a new user based on the request body 

  const entry = new Buyers({
    name: req.body.name,
    phone: req.body.phone,
    grade: req.body.grade,
    textbooks: req.body.textbooks,
    compiled_papers: req.body.compiled_papers

  });

  console.log('Performing buy task');

    entry.save().then(() => {
      console.log('Entry saved successfully');
      // mongoose.connection.close();
    })
    .catch(err => {
      console.error('Failed to save user:', err);
    });
  
    res.redirect("/buy");

});

app.get('/buy', (req, res) => {
  // res.send('Hello, World!');
  // console.log(__dirname + '/views/index.html');
  // res.sendFile(__dirname + '/views/index.html');
  res.render('buy');
});

app.post('/sell',  (req, res) => {
  // Create a new user based on the request body 
  
  const entry = new Sellers({
    name: req.body.name,
    phone: req.body.phone,
    grade: req.body.grade,
    textbooks: req.body.textbooks,
    compiled_papers: req.body.compiled_papers

  });

  console.log('Performing sell task');

    entry.save().then(() => {
      console.log('Entry saved successfully');
      // mongoose.connection.close();
    })
    .catch(err => {
      console.error('Failed to save user:', err);
    });
  
    res.redirect("/sell");

});


app.get('/sell', (req, res) => {
  // res.send('Hello, World!');
  // console.log(__dirname + '/views/index.html');
  // res.sendFile(__dirname + '/views/index.html');
  res.render('sell');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Link : ` + `localhost:${port}`);
});