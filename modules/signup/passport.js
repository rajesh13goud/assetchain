const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
var users = require('../../models/users.js')
    passport.use(new LocalStrategy(
        function(user,pass,done){
                console.log(user);
                console.log("It is also come here");
                if(!user){
                    return done(null,false)}
                else{ 
                console.log("just before the query :"+ user)      
                users.findOne({$and: [{$or : [{email: user},{mobile: parseInt(user)}]},{password : pass}]},{password : false, assets: false, otp: false},(err,user) => {
                if(err){
                    console.log(err);
                    return done(err, null, {message: 'DB error'});
                }
                console.log("the queried output : "+user)
                if(user != null){
                    return done(null,user,{message:'Logged In Succesfully'})
                }else { 
                    return done(null,false,{message:'Incorrect Email or Password'}) }
                })
                }
    }));
    