var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Mount Eve", 
		img: "https://www.nps.gov/grsa/planyourvisit/images/web-campground-2015.jpg?maxwidth=650&autorotate=false",
		description: "Beautiful Mountain"
	},
	{
		name: "Lake Revana", 
		img: "http://www.riverviewcampground.ca/wp-content/uploads/2018/06/campinglogo-300x200.jpg",
		description: "Beautiful lake"
	},
	{
		name: "Steven's Creek Country Park", 
		img: "https://cbschicago.files.wordpress.com/2014/06/camping1.jpg?w=625&h=352&crop=1",
		description: "Great place for hiking"
	}
];

function seedDB() {
	// remove all campgrounds
	Campground.deleteMany({}, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log("Campgrounds removed!");
			Comment.deleteMany({}, (err) => {
				if (err) {
					console.log(err);
				} else {
					console.log("Comments removed!");
					// add a few campgrounds
					data.forEach((seed) => {
						Campground.create(seed, (err, campground) => {
							if (err) {
								console.log(err);
							} else {
								console.log("Added a campground");
								//console.log(data);
								// add a few comments
								Comment.create(
									{
										text: "This is a great place.",
										author: "Homer"
									}, (err, comment) => {
										if (err) {
											console.log(err);
										} else {
											campground.comments.push(comment);
											campground.save();
											console.log("Created new comment");
											//console.log(campground);
											// Campground.findById(campground._id).populate("comments").exec((err, camp) => {
											// 	if (err) {
											// 		console.log(err);
											// 	} else {
											// 		console.log(campground);
											// 	}
											// });
										}
									}
								);
							}
						});
					});
				}
			});
		}
	});	
	
}

module.exports = seedDB;