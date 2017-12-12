# Coastal Quest
An Application built to give tourists and locals the chance to play and compete with others while learning about the Monterey Bay Peninsula, this application allows Coastal Quest (company) owners to create and modify real time commercial scavenger hunts.
#### Basic Information
Languages: Python, Javascript
Site Colors: Dark Blue #3E6F96, Light Blue #74CCCF, Gold #F2E537, White
All hunts are set to start/end at 12pm UTC (4am PST/5am PDT)
#### Code Detail
##### Frameworks/Libraries
Flask + ReactJS 
socketio is used for communication between client/server
The database we used was managed through postgresql and sqlalchemy was used to interpret
Stripe was used for managed payments
##### Setup and Installs
Install programs from requirements.txt as well as these:
*Webpack*

    nvm install 6
    npm install -g webpack
    npm install
    webpack --watch //needs to be done every time prior to running app.py

*Bootstrap (used for some css elements)*

    npm install react-bootstrap

*PostgreSQL for database management*

    sudo service postgresql start //starting postgres
    psql //opening postgres
    ubuntu=# create user username superuser password 'password '; //done only once

    //install psycopg2 to let Python speak to PostgreSQL
    sudo apt update
    sudo apt-get install python-dev
    sudo pip install psycopg2
    sudo pip install Flask-SQLAlchemy
    
Setting up ENV to work locally in cloud9:

    //enter in terminal
    c9 ~/.bashrc
    export DATABASE_URL=postgresql://username:password@localhost/postgres
And add postgresql://username:password@localhost/postgres to ENV variables in app.py as well
##### File Review
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

##### Known Issues
*Home*
- The slideshow on the front page is called by a recursive function. Refreshing without changing pages causes said function to be called multiple times. Doubles slideshow speed.

##### Future Features
*Admin*
- Admin page visual improvements (changing alerts to other kind of message, table layouts, etc)
- Ability to hide certain users from leaderboard in case of inappropriate team name/image
- A delete all participants option, or a duplicate hunt option that copies hunt details, so hunts can be reused (copying would be easier to implement and safer for user record keeping)
- Creation of/updating discount codes on admin page needs to be added

*Gameplay*
- Add sound for correct/incorrect answers
- Implement head to head scavenger hunts (versus mode essentially, rather than leaderboard two teams are competing against each other)

*Login*
- Forgot password/password reset system