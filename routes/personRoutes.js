const express = require("express");
const router=express.Router();
const Person=require('../Models/Person');
const {jwtAuthMiddleware, generateToken} = require('../jwt');

// Post route to add a person
// router.post('/',async(req,res)=>{
  // try{
  // const data=req.body;
  //  // Create a new Person document using Mongoose Model
  // const newPerson=new Person(data);
  //  // Save the newPerson to the database
  // const response=await newPerson.save();
  // console.log('data saved');
  // res.status(200).json(response);
  // }
  // catch(err){
  //   console.log(err);
  //   res.status(500).json({error:'Internal Server Error'});
  // }
// })

// Now is url se person ke data ko save karna hoga (http://localhost:3000/person/signup).Ab response m token
//  bhi milega
router.post('/signup',async(req,res)=>{
  try{
  const data=req.body;
   // Create a new Person document using Mongoose Model
  const newPerson=new Person(data);
   // Save the newPerson to the database
  const response=await newPerson.save();
  console.log('data saved');
  const payload = {
    id: response.id,
    username: response.username
  }
   console.log(JSON.stringify(payload));
   const token = generateToken(payload);
   console.log("Token is : ", token);
   res.status(200).json({response: response, token: token});
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
  }
})

// Login Route
router.post('/login', async(req, res) => {
  try{
      // Extract username and password from request body
      const {username, password} = req.body;

      // Find the user by username
      const user = await Person.findOne({username: username});

      // If user does not exist or password does not match, return error
      if( !user || !(await user.comparePassword(password))){
          return res.status(401).json({error: 'Invalid username or password'});
      }

      // generate Token 
      const payload = {
          id: user.id, //user.id is used here id is treated same as _id .
          username: user.username
      }
      const token = generateToken(payload);

      // return token as response
      res.json({token})
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try{
      const userData = req.user;
      console.log("User Data: ", userData);

      const userId = userData.id;
      const user = await Person.findById(userId);

      res.status(200).json({user});
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})


// GET Method to get the Person but now you can access this URL only if you provide tokens also, while requesting
// similarly like localAuthWare where you have to give username and password in Params section.Now you have to give
//  tokens
router.get("/",jwtAuthMiddleware,async(req, res)=>{ 
    try{
      const data=await Person.find();
      console.log('data fetched');
      res.status(200).json(data);
    }
    catch(err){
       console.log(err);
       res.status(500).json({error:'Internal Server Error'});
    }
 }); 

// Parametrized API Calls
router.get("/:worktype",async(req, res)=>{ 
  try{
  const worktype=req.params.worktype;// Extract the worktype from the URL Parameter(params signify parameterized API)
    if(worktype=='chef'||worktype=='manager'||worktype=='waiter'){
      const response=await Person.find({work:worktype});
      console.log('response fetched');
      res.status(200).json(response);
    }
    else{
      res.status(404).json({errors:'Invalid work type'});
    }
  }
  catch(err){
     console.log(err);
     res.status(500).json({error:'Internal Server Error'});
  }
}); 

// Update the Person Data 
router.put("/:id",async(req, res)=>{ 
    try{
      const personId=req.params.id;// Extract the id from the URL Parameter
      const UpdatedPersonData=req.body;// Updated Data for the Person
      const response=await Person.findByIdAndUpdate(personId,UpdatedPersonData,{
        new:true, //Return the Updated Document
        runValidators:true,//Run Mongoose Validation
      })
      if(!response){
        res.status(404).json({Error:'person not found'});
      }
      console.log('data updated');
      res.status(200).json(response); 
    }
    catch(err){
       console.log(err);
       res.status(500).json({error:'Internal Server Error'});
    }
 }); 

 // Delete the Person Data 
 router.delete("/:id",async(req, res)=>{ 
    try{
      const personId=req.params.id;// Extract the id from the URL Parameter
      const response=await Person.findByIdAndDelete(personId);
      if(!response){
        res.status(404).json({Error:'person not found'});
      }
      console.log('data deleted');
      // both will work
      // res.status(200).json({message:'person deleted successfully'});
       res.status(200).json(response); // you will be shown the deleted item in postman console
    }
    catch(err){
       console.log(err);
       res.status(500).json({error:'Internal Server Error'});
    }
 }); 
module.exports=router;
//comment added for testing purposes