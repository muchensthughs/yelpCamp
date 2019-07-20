var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
		{name: "Mount Eve", img: "https://www.nps.gov/grsa/planyourvisit/images/web-campground-2015.jpg?maxwidth=650&autorotate=false"},
		{name: "Lake Revana", img: "http://www.riverviewcampground.ca/wp-content/uploads/2018/06/campinglogo-300x200.jpg"},
		{name: "Steven's Creek Country Park", img: "https://cbschicago.files.wordpress.com/2014/06/camping1.jpg?w=625&h=352&crop=1"},
		{name: "Mount Eve", img: "https://www.nps.gov/grsa/planyourvisit/images/web-campground-2015.jpg?maxwidth=650&autorotate=false"},
		{name: "Lake Revana", img: "http://www.riverviewcampground.ca/wp-content/uploads/2018/06/campinglogo-300x200.jpg"},
		{name: "Steven's Creek Country Park", img: "https://cbschicago.files.wordpress.com/2014/06/camping1.jpg?w=625&h=352&crop=1"},
		{name: "Mount Eve", img: "https://www.nps.gov/grsa/planyourvisit/images/web-campground-2015.jpg?maxwidth=650&autorotate=false"},
		{name: "Lake Revana", img: "http://www.riverviewcampground.ca/wp-content/uploads/2018/06/campinglogo-300x200.jpg"},
		{name: "Steven's Creek Country Park", img: "https://cbschicago.files.wordpress.com/2014/06/camping1.jpg?w=625&h=352&crop=1"}
	];

app.get("/", (req, res) => {
	res.render("landing");
});

app.get("/campgrounds", (req, res) => {
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", (req, res) => {
	res.render("new");
});

app.post("/campgrounds", (req, res) => {
	// get data from form and update campgrounds data
	var name = req.body.name;
	var image = req.body.image;
	campgrounds.push({name: name, img: image});
	// redirect back to campgrounds page
	res.redirect("/campgrounds");

});

app.listen(3000, () => {
	console.log("Server Started!");
});