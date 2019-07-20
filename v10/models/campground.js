var mongoose   = require("mongoose");

// Schema setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	img: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment" //model this is refering to
		}
	]
});

// db.collection.drop can remove all objects in mongo
module.exports = mongoose.model("Campground", campgroundSchema);