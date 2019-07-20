var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
// ====================
// COMMENTS ROUTES
// ====================

router.get("/new", isLoggedIn, (req, res) => {
	// send campground info to the page
	Campground.findById(req.params.id, (err, campground) => {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

router.post("/", isLoggedIn, (req, res) => {
	// look up campground using id
	Campground.findById(req.params.id, (err, campground) => {
		if (err) {
			console.log(err);
		} else {
			// req.body.comment.author = req.user.username;
			// better way is to write id down instead of just username so it can be tracked later
			// create new comment object
			Comment.create(req.body.comment, (err, comment) => {
				if (err) {
					console.log(err);
				} else {
					// add username and id into comment 
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// need to save everytime an object in the database is updated
					comment.save();
					// add comment into campground
					campground.comments.push(comment);
					campground.save();
					//redirect
					res.redirect("/campgrounds/" + req.params.id);
				}
			});
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