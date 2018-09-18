//right now this function needs access to db and bcrypt
//and other shit like that, you can either require them
//all at the top again or use dependency injection

//db.select("name").from("users").then(data => console.log(data));
//returning is really only used for insert type commands db, cause you inserting
//you're not getting anything back whereas select command you don't need the returning



const handleRegister = (req,res,db,bcrypt)=>{
  const {name, email, password} = req.body;
  const hash = bcrypt.hashSync(password);
  
  if(!email || !name || !password){
    return res.status(400).json("Cannot Register user");
  }
  //transaction is code blocks that makes sures that when we're doing multiple
  //actions on a database and if one fails they all fail
  db.transaction(trx =>{
    trx("login").insert({
      hash: hash,
      email: email
    })
    .returning("email")
    .then(loginEmail =>{
      return trx("users").insert({
        name: name,
        email: loginEmail[0],
        joineddate: new Date()
      })
      .returning("*")
      .then(user => res.json(user[0]))
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json("Unable to Register"));

  // db("users").returning("*").insert({
  //   name: name,
  //   email: email,
  //   joineddate: new Date()
  // })
  // .then(user => res.json(user[0]))
  // .catch(err => res.status(400).json("There was an error"));

  // bcrypt.hash("potatoes", null, null, (err, hash)=>{
  //   console.log(hash);
  // })

  // database.users.push({
  //   name: name,
  //   email: email,
  //   password: password
  // });
  // res.json(database.users[database.users.length -1]);
};

module.exports = {
  handleRegister: handleRegister
}

// module.exports = handleRegister;




// const database = {
//   users:[
//     {
//       id: "32dsa",
//       name: "paul",
//       email: "paul@gmail.com",
//       password: "password",
//       entries:0,
//       joinedDate: new Date()
//     },
//     {
//       id: "f0d9s8",
//       name: "jack",
//       email: "jack@gmail.com",
//       password: "password1",
//       entries: 0,
//       joinedDate: new Date()
//     },
//
//   ]
// }
