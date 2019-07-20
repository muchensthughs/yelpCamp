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

