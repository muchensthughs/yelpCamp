var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, (err, campground) => {
			if (err || !campground) {	
				req.flash("error", "Campground not found");
		    	res.redirect("back");
			} else {
				// is user the author?
				if (campground.author.id.equals(req.user._id)) {
					return next();
				} else {
					req.flash("error", "You do not have permission to do that");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You have to be logged in to do that");
		res.redirect("back");
	}
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, (err, comment) => {
			if (err || !comment) {
				req.flash("error", "Comment not found");
		    	res.redirect("back");
			} else {
				// is user the author?
				if (comment.author.id.equals(req.user._id)) {
					return next();
				} else {
					req.flash("error", "You don't have permission to do that.");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You have to be logged in to do that");
		res.redirect("back");
	}
};

middlewareObj.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('error', 'Please Login First');
	res.redirect("/login");
};

module.exports = middlewareObj;