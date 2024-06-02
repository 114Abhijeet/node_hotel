//app.js--server.js
const express = require("express");
const app = express();
const port = 80;
// When your server runs(server.js file) it imports this db.js file to establish the database connection before
//handling HTTP requests
const db=require('./db'); // Exit mongod process(ctrl+c)to see the effect of event listeners.
// Write npm install body-parser in terminal
const bodyParser=require('body-parser');
app.use(bodyParser.json());
// const Person=require('./Models/Person'); -- To use router import it in personRoutes.js file
app.get("/",(req, res)=>{ 
    res.status(200).send('Welcome to my Hotel') ;
   });
   
// Post route to add a person
// app.post('/person',async(req,res)=>{
//   try{
//   const data=req.body;
//   // Create a new Person document using Mongoose Model
//   const newPerson=new Person(data);
//   // Save the newPerson to the database
//   const response=await newPerson.save();
//   console.log('data saved');
//   res.status(200).json(response);
//   }
//   catch(err){
//     console.log(err);
//     res.status(500).json({error:'Internal Server Error'});
//   }
// })

// GET Method to get the Person 
// app.get("/person",async(req, res)=>{ 
//     try{
//       const data=await Person.find();
//       console.log('data fetched');
//       res.status(200).json(data);
//     }
//     catch(err){
//        console.log(err);
//        res.status(500).json({error:'Internal Server Error'});
//     }
//  }); 

 // Parametrized API Calls
//  app.get("/person/:worktype",async(req, res)=>{ 
//   try{
//   const worktype=req.params.worktype;// Extract the worktype from the URL Parameter(params signify parameterized API)
//     if(worktype=='chef'||worktype=='manager'||worktype=='waiter'){
//       const response=await Person.find({work:worktype});
//       console.log('response fetched');
//       res.status(200).json(response);
//     }
//     else{
//       res.status(404).json({errors:'Invalid work type'});
//     }
//   }
//   catch(err){
//      console.log(err);
//      res.status(500).json({error:'Internal Server Error'});
//   }
// }); 

// Import the Router files 
const personRoutes=require('./routes/personRoutes');
// Use the routers 
app.use('/person',personRoutes); // personRoutes.js file me '/' endpoint se koi get request hoga to usko hit karega.
  app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
