var express    = require("express"),
	app        = express(),
	passport   = require("passport"),
	localStrategy = require("passport-local"),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose"),
	Campground = require("./models/campground"),
	Comment    = require("./models/comment"),
	User 	   = require("./models/user"),
	seedDB 	   = require("./seeds");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "This is the best",
	resave: false,
	saveUninitialized: false	
}));
app.use(passport.initialize());
app.use(passport.session());

// methods that come from passport-local-mongoose, added in User
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// create middleware for every single route to pass user data
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

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
//];

app.get("/", (req, res) => {
	res.render("landing");
});

app.get("/campgrounds", (req, res) => {
	// Get all campgrounds from DB
	Campground.find({}, (err, allcampgrounds) => {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: allcampgrounds, currentUser: req.user});
		}
	});
});

app.get("/campgrounds/new", isLoggedIn, (req, res) => {
	res.render("campgrounds/new");
});

app.post("/campgrounds", isLoggedIn, (req, res) => {
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


// SHOW PAGE
app.get("/campgrounds/:id", (req, res) => {
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

// ====================
// COMMENTS ROUTES
// ====================

app.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
	// send campground info to the page
	Campground.findById(req.params.id, (err, campground) => {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

app.post("/campgrounds/:id/comments", isLoggedIn, (req, res) => {
	// look up campground using id
	Campground.findById(req.params.id, (err, campground) => {
		if (err) {
			console.log(err);
		} else {
			console.log(req.body.comment);
			// create new comment object
			Comment.create(req.body.comment, (err, comment) => {
				if (err) {
					console.log(err);
				} else {
					// add comment into camoground
					campground.comments.push(comment);
					campground.save();
					//redirect
					res.redirect("/campgrounds/" + req.params.id);
				}
			});
		}
	});
	
	
});

//==================
// AUTH ROUTES
app.get("/register", (req, res) => {
	res.render("register");
});

app.post("/register", (req, res) => {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, (err, user) => {
		if (err) {
			console.log(err);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, () => {
			res.redirect("/campgrounds");
		});
	});
});

app.get("/login", (req, res) => {
	res.render("login");
});

app.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
	}), (req, res) => {});

app.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

app.listen(3000, () => {
	console.log("Server Started!");
});