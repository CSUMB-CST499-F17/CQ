import flask, flask_socketio, flask_sqlalchemy, stripe, sqlalchemy
import os, time, datetime, smtplib, re, random, hashlib, uuid
import models

#GLOBAL VARS
x = 1
questionNum = 0
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
    global questionNum
    questionsData = []

    try:
        questions = models.db.session.query(models.Questions)
        for row in questions:
            questionsData.append({'question':row.question, 'answer':row.answer,'hint1':row.hint_A,'hint2':row.hint_B,'hunts_id':row.hunts_id})
    except:
        print("Error: Database/table questions does not exist")
    
    socketio.emit('hunt', questionsData)
    questionNum += questionNum
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
    return lastPage
    
@socketio.on('validateCredentials')
def validateCredentials(data):
        try:
            query = models.db.session.query(models.Participants).filter(models.Participants.team_name == data['team_name'], models.Participants.leader_code == data['access']).first_or_404()
            userData = []
            userData.append({'email': query.email, 'team_name':query.team_name, 'hunt':query.hunts_id, 'progress':query.progress})
            socketio.emit('user', userData)
            return 'teamLead%' + query.team_name
        except:
            pass
        try:
            query = models.db.session.query(models.Participants).filter(models.Participants.team_name == data['team_name'], models.Participants.member_code == data['access']).first_or_404()
            userData = []
            userData.append({'email':query.email, 'team_name':query.team_name, 'hunt':query.hunts_id, 'progress':query.progress})
            socketio.emit('user', userData)
            return 'team%' + query.team_name
        except:
            pass
        try:
            query = models.db.session.query(models.Admins).filter(models.Admins.username == data['team_name'], models.Admins.password == data['access'], models.Admins.is_super == True).first_or_404()
            return 'superAdmin%' + query.username
        except:
            pass
        try:
            query = models.db.session.query(models.Admins).filter(models.Admins.username == data['team_name'], models.Admins.password == data['access'], models.Admins.is_super == False).first_or_404()
            return 'admin%' + query.username
        except:
            return 'no%guest'
        
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
    team_name = userdata['team_name']
    client_email = userdata['email']
    hunt_id = userdata['hunts_id']
    
    # check errors that database can catch
    if models.db.session.query(models.Participants).filter(models.Participants.email == client_email, models.Participants.hunts_id == hunt_id).count() > 0:
        socketio.emit('rejection', {'message':"email address already registered for this hunt"})
    elif models.db.session.query(models.Participants).filter(models.Participants.team_name == team_name).count() > 0:
        socketio.emit('rejection', {'message':"team name already registered for this hunt"})
    else:
        # create account
        random.seed();
        random_number = random.randint(0,9999)
        hunt_name = models.db.session.query(models.Hunts).filter(models.Hunts.id == hunt_id).first().name
        hunt_name = hunt_name.replace(" ", "")
        leader_code = hunt_name + "{:04d}".format(random_number)
        
        random.seed();
        random_number = random.randint(0,9999)
        member_code = hunt_name + "{:04d}".format(random_number)
        
        participants = None
        try:
            participants = models.Participants(client_email, team_name, userdata['image'], hash_password(leader_code), hash_password(member_code), None,None, 0, 0, False, hunt_id)
            models.db.session.add(participants)  
            models.db.session.commit()
            
            participants = models.db.session.query(models.Participants).filter(models.Participants.team_name == team_name)
        except:
            socketio.emit('rejection', {'message':'could not connect to database'})
            return
        
        try:
            price = 50
            total_percent = 1
            try:
                discount_query = models.db.session.query(models.Discounts).filter(models.Discounts.code == userdata['discount_code'])
                if discount_query.count() > 0:
                    total_percent = discount_query.first().percent / 100.0
            except:
                print("Error: couldn't connect to discount table")
                pass
            price = price * total_percent
            
            charge = stripe.Charge.create(
                amount=price,
                currency="usd",
                description="Coastal Quest Scavenger Hunt",
                source=token,
            )
            
            participants.has_paid = True
            models.db.session.commit()

            pass
        except stripe.error.CardError as e:
            body = e.json_body
            err  = body.get('error', {})
            socketio.emit('rejection', {'message':'account created, could not process payment; Access code: ' + leader_code + '; Error code: ' + err.get('code')})
            return
        except stripe.error.StripeError as e:
            socketio.emit('rejection', {'message':'account created, could not process payment; Access code: ' + leader_code})
            return
        
        # send email
        try:
            subject = "Coastal Quest Activation Code"
            message = "Welcome to Coastal Quest Scavenger Hunts, {}! Your access code is {}. Have fun on your journey!".format(team_name,leader_code)
            email_client(client_email,subject,message)
        except:
            print("Error: Could not send email")
            pass
        
        # emit access code back to JS app
        socketio.emit('acceptance', {'access_code':leader_code, 'price':price})
    
def email_client(client_email, subject, message):
    recp_message  = 'Subject: {}\n\n{}'.format(subject, message)
    email_address = "coastalquest1337@gmail.com"
    email_pass = "CoastalQuestsAreFun"
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(email_address, email_pass)
    server.sendmail(email_address, client_email, recp_message)
    server.quit()
    
def hash_password(password):
    # uuid is used to generate a random number
    salt = "You're too salty"
    return hashlib.sha256(salt.encode() + password.encode()).hexdigest() + ':' + salt

def check_password(hashed_password, user_password):
    password, salt = hashed_password.split(':')
    return password == hashlib.sha256(salt.encode() + user_password.encode()).hexdigest()

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