const handleSignin = (req,res,db,bcrypt) => {

  const {email, password} = req.body;
  if(!email || !password){
    return res.status(400).json("Cannot Sign In");
  }
  //video solution but my solution seems faster
  db.select("email", "hash")
  .from("login")
  .where("email", "=", email)
  .then(data => {
    const isValid = bcrypt.compareSync(password, data[0].hash);
    //console.log(isValid);
    if(isValid){
      db.select("*").from("users")
      .where("email", "=", email)
      .then(user =>{
        //console.log(user);
        res.json(user[0]);
      })
    }else{
      res.status(400).json("unable to get user");
    }
  })
  .catch(err => res.status(400).json("wrong credentials"));

  //my solution
  // db("login").select("*").where({
  //   email:req.body.email
  // })
  // .then(data => {
  //   if(bcrypt.compareSync(req.body.password, data[0].hash)){
  //     res.json(data[0]);
  //   }else{
  //     res.status(400).json("Invalid Password")
  //   }
  // })
  // .catch(err => res.json("Invalid Email"));



  // req.body.email === database.users[0].email
  // ? (req.body.password === database.users[0].password
  //   ? res.json(database.users[0])
  //   :res.status(400).json("fail"))
  // : res.json("fail");

  // bcrypt.compare("potatoes", "$2a$10$P8ePh407Mnbek1tpszzfvei6IMDjRhAlujJRG2Cg2U4RATRBF7h9C", (err,response)=>{
  //   console.log(response);
  // })
};

// module.exports = {
//   handleSignin: handleSignin
// }
module.exports = {
  handleSignin
}
