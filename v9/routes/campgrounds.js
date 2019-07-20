var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

router.get("/", (req, res) => {
	// Get all campgrounds from DB
	Campground.find({}, (err, allcampgrounds) => {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: allcampgrounds, currentUser: req.user});
		}
	});
});

router.post("/", isLoggedIn, (req, res) => {
	// get data from form and update campgrounds data
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = {name: name, img: image, description: description, author: author};
	// create a new campground and save to DB
	Campground.create(newCampground, (err, campground) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
	// campgrounds.push({name: name, img: image});
	// redirect back to campgrounds page

});

router.get("/new", isLoggedIn, (req, res) => {
	res.render("campgrounds/new");
});



// SHOW PAGE
router.get("/:id", (req, res) => {
	// Campground.findById(req.params.id, (err, campground) => {
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		console.log(campground);
	// 		res.render("show", {campground: campground});
	// 	}
	// });
	Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/show", {campground: campground});
		}
	});
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}
module.exports = router;