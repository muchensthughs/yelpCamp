var mongoose =require("mongoose");

var commentSchema = new mongoose.Schema({
	text: String,
	author: {
		// id is a object heres that why the {}
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

module.exports = mongoose.model("Comment", commentSchema);