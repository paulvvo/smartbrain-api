
const Clarifai  = require("clarifai");


const app = new Clarifai.App({
 apiKey: 'd4ccf75959a54619b16a900eab3667e7'
});

const handleApiRequest = (req,res) =>{
  //this way works fine
  app.models.predict("a403429f2ddf4b49b307e318f00e528b", req.body.imageUrl)
  .then(response => res.json(response))
  .catch(err => res.status(400).json("Fail Api Call"));
}

const handleImage =(req,res,db) =>{
  db("users")
  .returning("entries")
  .where({id:req.body.id})
  .increment("entries", 1)
  .then(entries => {
    console.log(entries[0]);
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json("Unable to get entries"));




  // const foundUser = database.users.filter((user) => {
  //   return user.id === req.body.id;
  // });
  // foundUser[0].entries++;
  // console.log(foundUser[0].entries);
}

module.exports = {
  handleImage,
  handleApiRequest
};
