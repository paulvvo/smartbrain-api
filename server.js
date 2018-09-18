const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const app = express();
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'password',
    database : 'smartbrain'
  }
});


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());



app.get("/", (req,res)=>{
  db("users").select("*")
  .then(users => res.json(users))
  .catch(err => res.status(400).json("error getting users"));
});
app.post("/signin", (req,res) =>{
  signin.handleSignin(req,res,db,bcrypt);
});
app.post("/register", (req,res) =>{
   register.handleRegister(req,res,db,bcrypt);
   //register(req,res,db,bcrypt);
});
app.get("/profile/:id", (req,res) =>{
  profile.handleGetProfile(req,res,db);
});
app.put("/image", (req,res) =>{
  image.handleImage(req,res,db);
});
app.post("/imageurl", (req,res)=>{
  image.handleApiRequest(req,res);
})
app.listen(process.env.PORT || 3001, ()=>{
  console.log("listening");
});
