// app.js--db.js
const mongoose=require('mongoose');
require('dotenv').config();
// Define the MongoDB Connection URL
// const mongoURL='mongodb://127.0.0.1:27017/hotels'; //local connection
//const mongoURL='mongodb+srv://HelloWorld:HelloWorld12345@cluster0.chlzhtq.mongodb.net/'; //Online Atlas Connection
const mongoURL=process.env.MongoDB_URL;
// Set up MongoDB Connection
// This step initializes the connection process but does not actually connect at this point
mongoose.connect(mongoURL,{useNewUrlParser: true,useUnifiedTopology:true});

//Mongoose maintains a default connection object representing the MongoDB Connection.You retrieve this object using
// mongoose.connection,It is used to handle events and interact with the database.
const db=mongoose.connection;

// Define Event Listeners for Database Connection
// Here connected,disconnected,error are event listeners keyword.
   db.on('connected',()=>{
  console.log('Connected to MongoDB Server');
   });
  db.on('error',(err)=>{
    console.log('MongoDB Connection error:' ,err);
  });
  db.on('disconnected',()=>{
    console.log('MongoDB Disconnected');
  });

  // Export the database connection(db object)into server.js file,You can import it and use it in some other
  // parts of your Node.js Application( like Express.js server files) 
  // db.js file acts as a central module that manages the connection to your MongoDB Database using Mongoose.it sets 
  // up the connection,handles connection events,and exports the connection objects.
  module.exports=db;





