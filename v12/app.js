var express    = require("express"),
	app        = express(),
	passport   = require("passport"),
	localStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose"),
	flash = require('connect-flash'),
	Campground = require("./models/campground"),
	Comment    = require("./models/comment"),
	User 	   = require("./models/user"),
	seedDB 	   = require("./seeds");

var commentRoutes    = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes       = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

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
	res.locals.currentUser = req.user; // user info can be accessed in every ejs. req.user is always accessible in routes files
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, () => {
	console.log("Server Started!");
});