const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./Models/Person'); // Adjust the path as needed

// sets up Passport with a local authentication strategy, using a Person model for user data. 
// For checking/Authentication purpose whether username,password provided is valid or not
passport.use(new LocalStrategy(async (USERNAME, PASSWORD, done) => {
    // Authentication logic here
    try {
        // console.log('Received credentials:', USERNAME,PASSWORD); 
        const user = await Person.findOne({ username:USERNAME });
        if (!user)
            return done(null, false, { message: 'Incorrect username.' });
        
 // const isPasswordMatch=user.password==PASSWORD?true:false; // this line of code we have used while implementing 
 //authentication of "/".(plain text password issue)
        const isPasswordMatch = await user.comparePassword(PASSWORD);
        if (isPasswordMatch)
            return done(null, user);
        else
            return done(null, false, { message: 'Incorrect password.' })
    } catch (error) {
        return done(error);
    }
}));

module.exports = passport; // Export configured passport