var express = require("express");
var router = express.Router();

var Campground = require("../models/campground");

//Index
router.get("/", function(req,res) {
    Campground.find({}, function(err, allCampgrounds){
        if (err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
    // res.render("campgrounds", {campgrounds: campgrounds});
})

// Create new campground
router.post("/", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var des = req.body.description;
    var newCampground = {name: name, image: image, description: des};
    Campground.create(newCampground, function(err, newlyCreated){
        if (err){
           console.log(err);
        } else {
            res.redirect("/campgrounds");    
        }
    });
});

// NEW - show form to create new
router.get("/new", function(req, res) {
   res.render("campgrounds/new"); 
});

// SHOW
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if (err){
           console.log(err);
       } else {
           console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});       
       }
    });
    
});

module.exports = router;
