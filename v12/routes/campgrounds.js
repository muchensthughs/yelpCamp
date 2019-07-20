var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/", (req, res) => {
	// Get all campgrounds from DB
	Campground.find({}, (err, allcampgrounds) => {
		if (err) {
			req.flash("error", "Could not load campgrounds");
			res.redirect("back");
		} else {
			res.render("campgrounds/index", {campgrounds: allcampgrounds, currentUser: req.user});
		}
	});
});

router.post("/", middleware.isLoggedIn, (req, res) => {
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
		if (err || !campground) {
			req.flash("error", "Could not create campground");
		} 
		res.redirect("/campgrounds");
	});
});

router.get("/new", middleware.isLoggedIn, (req, res) => {
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
		// here campground is the embedded version (contains everything of comments)
		if (err) {
			req.flash("error", err.message);
			res.redirect("back");
		} else {
			res.render("campgrounds/show", {campground: campground});
		}
	});
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {	
	Campground.findById(req.params.id, (err, campground) => {
		res.render("campgrounds/edit", {campground: campground});
	});
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
		if (err || !updatedCampground) {
			req.flash("error", "Could not update campground");
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "Successfully updated campground!");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndRemove(req.params.id, (err) => {
		if (err) {
			req.flash("error", err.message);
		} else {
			req.flash("success", "Campground deleted!");
		}
		res.redirect("/campgrounds");
	});
});


module.exports = router;