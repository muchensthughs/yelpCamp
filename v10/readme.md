name    url      verb     desc.
===============================================
INDEX  /dogs     GET      Display a list of all dogs
NEW    /dogs/new GET      Display the form to make a new dogs
CREATE /dogs     POST     Add new dog to DB
SHOW   /dogs/:id GET      Show info about one dog


NEW    /campgrounds/:id/comments/new  GET
CREATE /campgrounds/:id/comments      POST


# Refactor Monggose Code
* create a models directory
* use modele.exports
* require models correctly

# Add Seeds File
* add seeds.js
* run seeds.js everytime server starts

# Add comment model file
* add comment.js
* display comments on show page

# Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

# Style Show page
* Add side bar to show page
* Display comments nicely

# Finish Styling Show Page
* Add public directory
* Add custom stylesheet

# Auth Pt. 1 - Add User Model
* Install packages for Auth
* Define User model

# Auth Pt. 2 - Register
* Configure Passport
* Add register routes
* Add register template

# Auth Pt. 3 - Login
* Add login routes
* Add login template

# Auth Pt. 4 - Logout/Navbar
* Add logout route
* Prevent user from adding comments if not signed in
* Add links to navbar

# Auth Pt. 5 - Show/Hide Links
* Show/hide auth links in navbar correctly

# Refactor the Routes
* Use express router to recognize all routes

# Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

# Authorization
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

# Editing Campgrounds
* Add method override
* Add edit route for campgrounds
* Add link to edit page
* Add update route
* Fix $set problem

# Editing Comments
* Add edit route for comment
* Add edit button
* Add update route
/campgrounds/:id/comments/:comment_id/edit

# Deleting Comments
* Add Destroy route
* Add delete button

# Authorization 2
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons