var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Mount Eve", 
		img: "https://www.nps.gov/grsa/planyourvisit/images/web-campground-2015.jpg?maxwidth=650&autorotate=false",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu consequat ac felis donec et odio pellentesque diam. Facilisis sed odio morbi quis. Enim praesent elementum facilisis leo vel fringilla. Pretium quam vulputate dignissim suspendisse in. Congue quisque egestas diam in arcu cursus euismod. Mollis nunc sed id semper risus. Orci ac auctor augue mauris. Sit amet consectetur adipiscing elit ut. Diam vulputate ut pharetra sit amet. Fermentum dui faucibus in ornare quam viverra. Dolor sit amet consectetur adipiscing elit ut aliquam purus sit. Aliquet risus feugiat in ante metus dictum. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Convallis a cras semper auctor neque. Ornare aenean euismod elementum nisi quis eleifend quam. Blandit aliquam etiam erat velit scelerisque in dictum. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Laoreet sit amet cursus sit amet dictum sit amet. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida."
	},
	{
		name: "Lake Revana", 
		img: "http://www.riverviewcampground.ca/wp-content/uploads/2018/06/campinglogo-300x200.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu consequat ac felis donec et odio pellentesque diam. Facilisis sed odio morbi quis. Enim praesent elementum facilisis leo vel fringilla. Pretium quam vulputate dignissim suspendisse in. Congue quisque egestas diam in arcu cursus euismod. Mollis nunc sed id semper risus. Orci ac auctor augue mauris. Sit amet consectetur adipiscing elit ut. Diam vulputate ut pharetra sit amet. Fermentum dui faucibus in ornare quam viverra. Dolor sit amet consectetur adipiscing elit ut aliquam purus sit. Aliquet risus feugiat in ante metus dictum. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Convallis a cras semper auctor neque. Ornare aenean euismod elementum nisi quis eleifend quam. Blandit aliquam etiam erat velit scelerisque in dictum. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Laoreet sit amet cursus sit amet dictum sit amet. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida."
	},
	{
		name: "Steven's Creek Country Park", 
		img: "https://cbschicago.files.wordpress.com/2014/06/camping1.jpg?w=625&h=352&crop=1",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu consequat ac felis donec et odio pellentesque diam. Facilisis sed odio morbi quis. Enim praesent elementum facilisis leo vel fringilla. Pretium quam vulputate dignissim suspendisse in. Congue quisque egestas diam in arcu cursus euismod. Mollis nunc sed id semper risus. Orci ac auctor augue mauris. Sit amet consectetur adipiscing elit ut. Diam vulputate ut pharetra sit amet. Fermentum dui faucibus in ornare quam viverra. Dolor sit amet consectetur adipiscing elit ut aliquam purus sit. Aliquet risus feugiat in ante metus dictum. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Convallis a cras semper auctor neque. Ornare aenean euismod elementum nisi quis eleifend quam. Blandit aliquam etiam erat velit scelerisque in dictum. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Laoreet sit amet cursus sit amet dictum sit amet. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida."
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