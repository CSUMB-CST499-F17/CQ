# Coastal Quest
Languages: Python, Javascript

Built to give tourists and locals the chance to play and compete with others while learning about the Monterey Bay Peninsula, this application allows Coastal Quest (company) owners to create and modify real time commercial scavenger hunts.

#### Frameworks/Libraries
Flask + ReactJS 
socketio is used for communication between client/server
The database we used was managed through postgresql and sqlalchemy was used to interpret
Stripe was used for managed payments

#### File Review
**Scripts**
The javascript files in the scripts folder handle functions and display for specific pages with a few exceptions
*Socket.js*  enables client-server interaction
*content.js* is the 'master page' that contains all other js pages
&nbsp;&nbsp;&nbsp;Variables stored in content's state are passed down to many other pages to be used (ex: client identity)
*main.js* renders content (all the site's pages) to a div to be displayed in html

**Templates**
*index.html* includes the stylesheet reference, content div, and stripe initialization. Currently the only template

**Static**
*image folder* contains all image files for the site
*CQ.css* is the stylesheet.
&nbsp;&nbsp;&nbsp;Most features and pages are designed with css that works for both mobile and pc. 
&nbsp;&nbsp;&nbsp;Special mobile adaptations can be found under @media only screen[...] 
*script.js* auto created by webpack, keeps track of all changes so you can save and preview changes without restarting
&nbsp;&nbsp;&nbsp;Useful for coding, but doesn't matter after pushing to heroku

**Other Files**
*app.py* is the core file of the system, it runs the application and the server
On app.py ...
- anything beginning with @socketio.on(-string-) is called by javascript side code
- hello() renders the html file
- update<Page>(data) is called whenever a user changes pages and often pulls relevent information - from the database to update the site

*models.py* contains the database format

*requirements.txt* is not everything we are using, but includes all installs that need to be tracked by heroku. npm installs usually don't need to be included, pip installs/easy install do
