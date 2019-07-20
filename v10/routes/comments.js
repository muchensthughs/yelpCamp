var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// CREATE ROUTE
router.get("/new", middleware.isLoggedIn, (req, res) => {
	// send campground info to the page
	Campground.findById(req.params.id, (err, campground) => {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

// POST ROUTE
router.post("/", middleware.isLoggedIn, (req, res) => {
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

// EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
	Comment.findById(req.params.comment_id, (err, comment) => {
		Campground.findById(req.params.id, (err, campground) => {
			res.render("comments/edit", {campground: campground, comment: comment});
		});
	});
});

// UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
		if (err) {
			console.log(err);
		}
		res.redirect("/campgrounds/" + req.params.id);
	});
});

// DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
	Comment.findByIdAndRemove(req.params.comment_id, (err) => {
		if (err) {
			console.log(err);
		}
		res.redirect("/campgrounds/" + req.params.id);
	});
});

module.exports = router;