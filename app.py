import flask, flask_socketio, flask_sqlalchemy, stripe, sqlalchemy
import os, time, datetime, smtplib, re, random
import models

#GLOBAL VARS
x = 1
teams = []

#REACT, FLASK, AND DB STUFF
app = flask.Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

socketio = flask_socketio.SocketIO(app)
db = flask_sqlalchemy.SQLAlchemy(app)

#FUNCTIONS
@app.route('/')
def hello():
    return flask.render_template('index.html')

@socketio.on('play')
def getHunt(data):
    # huntsQuery = models.Hunts.query.all()
    # for i in range (0, len(huntsQuery)):
    #     questionsQuery = { 'message':huntsQuery[i].question,'name':huntsQuery[i].answer,'picture':huntsQuery[i].hint}
    #     questions.append(questionsQuery)
    
    # question = {
    #     'question': "Find California's first theatre.  On the front door, there is a poem.  Who is the poem about?",
    #     'answer': "Miners",
    #     'hint1': "You will find the theatre on the corner of Pacific and John Street.",
    #     'hint2': "",
    #     'questionNum': 1
    # }
    
    question = "Find California's first theatre.  On the front door, there is a poem.  Who is the poem about?"
    correctAnswer = "Miners"
    hint1 = "You will find the theatre on the corner of Pacific and John Street."
    hint2 = ""
    questionNum = 1
    socketio.emit('hunt', {
        'questions': question,
        'correctAnswer': correctAnswer,
        'hint1': hint1,
        'hint2': hint2,
        'questionNum' : questionNum
    })
    print('Scavenger hunt data sent.')
    
def dropDown():
    hunts = [];
    
    try:
        recent = models.db.session.query(models.Hunts)
        for row in recent:
            hunts.append({'name':row.name,'h_type':row.h_type,'desc':row.desc,'image':row.image,'start_time':row.start_time,'end_time':row.end_time,'start_text':row.start_text })
        print hunts
#       socketio.emit('hunt-info', hunts)
    except:
        print("Error: Database does not exist")


@socketio.on('home')
def updateHome(data):
    loggedIn = data['loggedIn'].lower()
    lastPage = data['lastPage']
    superAdminPages = ['admins', 'adminCreate']
    adminPages = ['adminHome', 'adminLeaderboard', 'adminHunts', 'adminCreateHunt', 'adminEditHunt'].extend(superAdminPages)
    teamPages = ['play']
    resetConditions = ('no' in loggedIn) or ((lastPage in adminPages) and ('admin' not in loggedIn)) or ((lastPage in teamPages) and ('team' not in loggedIn)) or ((lastPage in superAdminPages) and ('super' not in loggedIn))
    if resetConditions:
	    lastPage = 'home'
    socketio.emit('updateHome', lastPage)
    
@socketio.on('validateCredentials')
def validateCredentials(data):
        try:
            query = models.db.session.query(models.Participants).filter(models.Participants.email == data['email'], models.Participants.access_code == data['access']).first_or_404()
            socketio.emit('login', {'validation': True, 'user':'participant'})
        except:
            try:
                query = models.db.session.query(models.Admins).filter(models.Admins.email == data['email'], models.Participants.password == data['access']).first_or_404()
                socketio.emit('login', {'validation': True, 'user':'admin'})
            except:
                socketio.emit('login', {'validation': False, 'user':''})
        
@socketio.on('leaderboard')
def updateLeaderboard():
    global teams
    teams.append({
      'name': 'jason',
      'picture': 'me',
    })
    socketio.emit('users', {
        'userlist': teams
    })
    print('Leaderboard data sent.')

@socketio.on('register')
def updateRegister():
    ongoingHunts = [];
    try:
        sql = models.db.session.query(models.Hunts.id,models.Hunts.name,models.Hunts.h_type).filter(sqlalchemy.and_(models.Hunts.start_time <= datetime.datetime.now(),models.Hunts.end_time >= datetime.datetime.now())).order_by(models.Hunts.id.desc())
        for row in sql:
            ongoingHunts.append({'id':row.id,'name':row.name,'h_type':row.h_type})
        socketio.emit('updateRegister', ongoingHunts) 
    except:
        print("Error: Database does not exist")

@socketio.on('createHunt')
def createHunt(data):
    global x
    print(data)
    hunts = models.Hunts(data['name'], data['type'], data['desc'], data['image'], data['sDate'], data['eDate'], data['sDate'])
    models.db.session.add(hunts)  
    models.db.session.commit()
    
    questions = models.Questions(data['question'], data['answer'], data['image'], data['hint1'], data['hint2'], data[x])
    models.db.session.add(questions)
    models.db.session.commit()
    x += 1
    # user = models.Participants("andramirez@csumb.edu", "Yo Mama", "image", "1234", "12", datetime.datetime.now().time(), "1")
@socketio.on('checkout')
def checkout(data):
    
    stripe.api_key = "sk_test_O6BW3ED77qHecdLRd832IdjW"
    token = data['token']
    userdata = data['userdata']
    client_email = userdata['email']
    hunt_id = userdata['hunts_id']
    
    # parse client_email to check if valid
    # then query db to check if user has already done hunt
    # if these checks are fine, go ahead and charge, create account, send email
    if not re.match(r"[^@]+@[^@]+\.[^@]+", client_email):
        socketio.emit('rejection', {'message':"invalid email address"})
    elif models.db.session.query(models.Participants).filter(models.Participants.email == client_email, models.Participants.hunts_id == hunt_id).count() > 0:
        socketio.emit('rejection', {'message':"email address already registered for this hunt"})
    else:
        # charge client through stripe
        charge = stripe.Charge.create(
          amount=50,
          currency="usd",
          description="Coastal Quest Scavenger Hunt",
          source=token,
        )
       
        # create account
        random.seed();
        random_number = random.randint(0,9999)
        #hunt_name = "Sample Hunt" #query db to get name of hunt with hunt_id #SELECT name FROM hunts WHERE id = hunt_id
        hunt_name = models.db.session.query(models.Hunts).filter(models.Hunts.id == hunt_id).first().name
        hunt_name = hunt_name.replace(" ", "")
        access_code = hunt_name + "{:04d}".format(random_number)
        try:
            participants = models.Participants(userdata['email'],userdata['team_name'], userdata['image'], access_code, 0, datetime.datetime.now(), userdata['hunts_id'])
            models.db.session.add(participants)  
            models.db.session.commit()
        except:
            print("Error: Database does not exist")
        
        # send email
        subject = "Coastal Quest Activation Code"
        message = "Welcome to Coastal Quest Scavenger Hunts, {}! Your access code is {}. Have fun on your journey!".format(userdata['team_name'],access_code)
        email_client(client_email,subject,message)
        
        socketio.emit('acceptance', {'access_code':access_code})
    
def email_client(client_email, subject, message):
    recp_message  = 'Subject: {}\n\n{}'.format(subject, message)
    email_address = "coastalquest1337@gmail.com"
    email_pass = "CoastalQuestsAreFun"
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(email_address, email_pass)
    server.sendmail(email_address, client_email, recp_message)
    server.quit()

if __name__ == '__main__':
    socketio.run(
            app,
            host=os.getenv('IP', '0.0.0.0'),
            port=int(os.getenv('PORT', 8080)),
            debug=True,
            use_reloader=False
            )
        # team = []
        # team = {
        #     'team_name': "Lakers",
        #     'image': "yourface.png",
        #     'question_score': "100",
        #     'time_taken': "60 second",
        #     'hunts_id': '1',
        # }
        # socketio.emit('leaderboard', {
        #     'teams': team 
        # })