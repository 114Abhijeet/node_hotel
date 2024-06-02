const express = require("express");
const router=express.Router();
const Person=require('../Models/Person');
// Post route to add a person
router.post('/',async(req,res)=>{
  try{
  const data=req.body;
   // Create a new Person document using Mongoose Model
  const newPerson=new Person(data);
   // Save the newPerson to the database
  const response=await newPerson.save();
  console.log('data saved');
  res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
  }
})

// GET Method to get the Person 
router.get("/",async(req, res)=>{ 
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