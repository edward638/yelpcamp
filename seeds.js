var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment     = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://i.ytimg.com/vi/N5qLVlSzaQ0/maxresdefault.jpg",
        description: "It's so important to do something every day that will make you happy. This is your world, whatever makes you happy you can put in it. Go crazy. You can create anything that makes you happy. You can't have light without dark. You can't know happiness unless you've known sorrow." 
    },
    {
        name: "Sequoia",
        image: "https://www.nps.gov/seki/planyourvisit/images/SEQU_150426_ATB_128_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
        description: "It's so important to do something every day that will make you happy. This is your world, whatever makes you happy you can put in it. Go crazy. You can create anything that makes you happy. You can't have light without dark. You can't know happiness unless you've known sorrow." 
    },
    {
        name: "Sakaar",
        image: "https://vignette.wikia.nocookie.net/disney/images/4/4d/Sakaar.jpg/revision/latest?cb=20171213190812",
        description: "It's so important to do something every day that will make you happy. This is your world, whatever makes you happy you can put in it. Go crazy. You can create anything that makes you happy. You can't have light without dark. You can't know happiness unless you've known sorrow." 
    }
]

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if (err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if (err) {
                    console.log(err);
                } else {
                    console.log("added campground");
                    Comment.create({
                        text: "This place is great, I wish there was internet",
                        author: "Homer"
                    }, function(err, comment){
                        if (err){
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();    
                            console.log("comment saved!");
                        }
                    })
                }
            });  
        });
    });
    
    
    // add a few campgrounds
    
    
    
}

module.exports = seedDB;

