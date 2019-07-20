var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, (err, campground) => {
			if (err) {
				console.log(err);
		    	res.redirect("back");
			} else {
				// is user the author?
				if (campground.author.id.equals(req.user._id)) {
					return next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		res.redirect("back");
	}
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, (err, comment) => {
			if (err) {
				console.log(err);
		    	res.redirect("back");
			} else {
				// is user the author?
				if (comment.author.id.equals(req.user._id)) {
					return next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		res.redirect("back");
	}
};

middlewareObj.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
};

module.exports = middlewareObj;