var express    = require("express"),
	app        = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose");


mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// Schema setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	img: String,
	description: String
});

// db.collection.drop can remove all objects in mongo 
//Create model: give all the methods. Setup collection name
var Campground = mongoose.model("Campground", campgroundSchema);
// Campground.create(
// 	{
// 		name: "Mount Eve", 
// 		img: "https://www.nps.gov/grsa/planyourvisit/images/web-campground-2015.jpg?maxwidth=650&autorotate=false",
// 		description: "This campground is very cool. You can see the stars at night."
// 	}, 
// 	(err, campground) => {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log("New campground created:");
// 		console.log(campground);
// 	}
// });

// var campgrounds = [
// 		{name: "Mount Eve", img: "https://www.nps.gov/grsa/planyourvisit/images/web-campground-2015.jpg?maxwidth=650&autorotate=false"},
// 		{name: "Lake Revana", img: "http://www.riverviewcampground.ca/wp-content/uploads/2018/06/campinglogo-300x200.jpg"},
// 		{name: "Steven's Creek Country Park", img: "https://cbschicago.files.wordpress.com/2014/06/camping1.jpg?w=625&h=352&crop=1"},
// 		{name: "Mount Eve", img: "https://www.nps.gov/grsa/planyourvisit/images/web-campground-2015.jpg?maxwidth=650&autorotate=false"},
// 		{name: "Lake Revana", img: "http://www.riverviewcampground.ca/wp-content/uploads/2018/06/campinglogo-300x200.jpg"},
// 		{name: "Steven's Creek Country Park", img: "https://cbschicago.files.wordpress.com/2014/06/camping1.jpg?w=625&h=352&crop=1"},
// 		{name: "Mount Eve", img: "https://www.nps.gov/grsa/planyourvisit/images/web-campground-2015.jpg?maxwidth=650&autorotate=false"},
// 		{name: "Lake Revana", img: "http://www.riverviewcampground.ca/wp-content/uploads/2018/06/campinglogo-300x200.jpg"},
// 		{name: "Steven's Creek Country Park", img: "https://cbschicago.files.wordpress.com/2014/06/camping1.jpg?w=625&h=352&crop=1"}
// 	];

app.get("/", (req, res) => {
	res.render("landing");
});

app.get("/campgrounds", (req, res) => {
	// Get all campgrounds from DB
	Campground.find({}, (err, allcampgrounds) => {
		if (err) {
			console.log(err);
		} else {
			res.render("index", {campgrounds: allcampgrounds});
		}
	});
	// res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", (req, res) => {
	res.render("new");
});

app.post("/campgrounds", (req, res) => {
	// get data from form and update campgrounds data
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = {name: name, img: image, description: description};
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

app.get("/campgrounds/:id", (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if (err) {
			console.log(err);
		} else {
			res.render("show", {campground: campground});
		}
	});
});

app.listen(3000, () => {
	console.log("Server Started!");
});