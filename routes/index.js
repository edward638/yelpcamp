var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req,res){
    res.render("landing");
});

// AUTHENTICATION ROUTES

// SHOW register form
router.get("/register", function(req,res){
    res.render("register");
})

// sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("register");
        } 
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome, " + user.username + "!");
            res.redirect("/campgrounds");
        });
    });
});

// SHOW login form
router.get("/login", function(req, res) {
    res.render("login");
})

// handles login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});


// logout
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You were logged out!");
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
