const handleGetProfile = (req,res,db) => {

  db.select("*").from("users").where({
    id:req.params.id
  })
  .then(user => {
    if(user.length){
      res.json(user[0]);
    }else{
      res.status(400).json("Not Found");
    }
    console.log(user)
  })
  .catch(err => res.status(400).json("Error Finding User"));



  // let foundUser = false;
  // database.users.forEach((user) => {
  //   if(user.id === req.params.id){
  //       foundUser = true;
  //       return res.json(user);
  //   }
  // });
  // if(!foundUser){
  //   res.json("not found user");
  // }

  // const foundUser = database.users.filter((user) => {
  //   return user.id === req.params.id;
  // });
  //
  // console.log(foundUser[0]);
  // res.json(foundUser[0]);
}

module.exports={
  handleGetProfile
}
