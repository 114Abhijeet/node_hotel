const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Define the Person Schema
const personschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
});

personschema.pre('save', async function(next){
//In person variable data of that person is stored which is going to be saved,current person is accessed by "this"
    const person = this;

    // Hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next(); // isModified is a pre-built function

    try{
        // hash password generation
        const salt = await bcrypt.genSalt(10);

        // hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);
        
        // Override the plain password with the hashed one
        person.password = hashedPassword;
        next(); //this next() function add hashed password in database.
    }catch(err){
        return next(err);
    }
})

personschema.methods.comparePassword = async function(candidatePassword){
    try{
        // Use bcrypt to compare the provided password with the hashed password

        const isMatch = await bcrypt.compare(candidatePassword, this.password);//compare is a pre-built function
        return isMatch;
    }catch(err){
        throw err;
    }
}


// Create Person Model
const Person=new mongoose.model('Person',personschema); 
module.exports=Person;
