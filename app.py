import flask, flask_socketio, flask_sqlalchemy, stripe, sqlalchemy
import os, time, datetime, smtplib, re, random, hashlib, uuid, json
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

@socketio.on('home')
def updateHome(data):
    loggedIn = data['loggedIn'].lower()
    lastPage = data['lastPage']
    superAdminPages = ['admins', 'adminCreate']
    adminPages = ['adminHome', 'adminLeaderboard', 'adminHunts', 'adminCreateHunt', 'adminEditHunt']
    adminPages.extend(superAdminPages)
    teamPages = ['play']
    loginPages = [] 
    loginPages.extend(adminPages)
    loginPages.extend(teamPages)
    notLoggedIn = ('no' in loggedIn) and (lastPage in loginPages)
    notAdmin = (lastPage in adminPages) and ('admin' not in loggedIn)
    notSuperAdmin = ((lastPage in superAdminPages) and ('super' not in loggedIn))
    noTeam = (lastPage in teamPages) and ('team' not in loggedIn)
    resetConditions = notLoggedIn or notAdmin or notSuperAdmin or noTeam
    if resetConditions:
	    lastPage = 'home'
    return lastPage

@socketio.on('explore')
def updateExplore(data):
    socketio.emit('updateExplore')

@socketio.on('changeType')
def changeType(data):
    choice = data;
    if data == '':
        choice = 'walking'
    hunts = [];
    types = [];
    try:
        t_list = models.db.session.query(models.Hunts.h_type).distinct()
        for row in t_list:
            types.append(row.h_type)
        h_list = models.db.session.query(models.Hunts).filter(models.Hunts.h_type == choice); #default type
        for row in h_list:
            hunts.append({'id':row.id,'name':row.name,'h_type':row.h_type,'desc':row.desc,'image':row.image,'start_time':row.start_time.strftime('%A %B %-d %-I:%M %p'),'end_time':row.end_time.strftime('%A %B %-d %-I:%M %p'),'start_text':row.start_text })
        return json.dumps({'choice':choice,'hunts':hunts,'types':types})
    except Exception as e: 
        print(e)

@socketio.on('validateCredentials')
def validateCredentials(data):
        try:  
            users = models.db.session.query(models.Participants).filter(models.Participants.team_name == data['team_name'])
            for query in users:
                if(check_password(query.leader_code, data['access'])):
                    # if query.progress == -1:
                    #     return json.dumps({'id':query.id, 'loggedIn':'finished', 'name':query.team_name, "hunts_id":query.hunts_id})
                    return json.dumps({'id':query.id, 'loggedIn':'teamLead', 'name':query.team_name, "hunts_id":query.hunts_id})
                elif(check_password(query.member_code, data['access'])):
                    # if query.progress == -1:
                    #     return json.dumps({'id':query.id, 'loggedIn':'finished', 'name':query.team_name, "hunts_id":query.hunts_id})
                    return json.dumps({'id':query.id, 'loggedIn':'team', 'name':query.team_name, "hunts_id":query.hunts_id})
                    
            users = models.db.session.query(models.Admins).filter(models.Admins.username == data['team_name'], models.Admins.is_super == True)
            for query in users:    
                if(check_password(query.password, data['access'])):
                    return json.dumps({'id':query.id, 'loggedIn':'superAdmin', 'name':query.username})
                    
            users = models.db.session.query(models.Admins).filter(models.Admins.username == data['team_name'], models.Admins.is_super == False)
            for query in users:
                if(check_password(query.password, data['access'])):
                    return json.dumps({'id':query.id, 'loggedIn':'admin', 'name':query.username})
            
            return json.dumps({'id':-1, 'loggedIn':'no', 'name':'guest'})
        except Exception as e: 
            print(e)
     
@socketio.on('play')
def updatePlay(data):
    socketio.emit('updatePlay', 'updatePlay');

@socketio.on('loadUser')
def getUser(data):
    userData = []
    try:
        users = models.db.session.query(models.Participants).filter(models.Participants.id == data)
        for query in users:  
            if(query.progress == -1):
                userData.append({'id':data, 'email': query.email, 'team_name':query.team_name, 'hunts_id':query.hunts_id, 'progress':query.progress, 'score':query.score, 'attempts':query.attempts, 'hints':query.hints, 'start_time':query.start_time.strftime("%Y-%m-%d %H:%M:%S"), 'end_time':query.end_time.strftime("%Y-%m-%d %H:%M:%S")})
            else:
                userData.append({'id':data, 'email': query.email, 'team_name':query.team_name, 'hunts_id':query.hunts_id, 'progress':query.progress, 'score':query.score, 'attempts':query.attempts, 'hints':query.hints, 'start_time':query.start_time.strftime("%Y-%m-%d %H:%M:%S"), 'end_time':query.end_time})
        return json.dumps(userData)
    except Exception as e: 
        print(e)

@socketio.on('loadHunts')
def getHunt(data):
    huntData = []
    questionsData = []
    try:
        hunt = models.db.session.query(models.Hunts).filter(models.Hunts.id == data)
        for row in hunt:
            huntData.append({'id':row.id, 'name': row.name, 'image':row.image, 'start_text':row.start_text})
    except Exception as e: 
        print(e)
    try:
        questions = models.db.session.query(models.Questions).filter(models.Questions.hunts_id == data)
        for row in questions:
            questionsData.append({'question':row.question, 'answer':row.answer,'hint1':row.hint_A,'hint2':row.hint_B,'hunts_id':row.hunts_id})
    except Exception as e: 
        print(e)
    return json.dumps({'hunt':huntData,'questions':questionsData})


@socketio.on('update')
def updateProgress(data):
    try:
        user = data['user']
        #updates the progress
        query = models.db.session.query(models.Participants).filter(models.Participants.email == user['email'], models.Participants.team_name == user['team_name'], models.Participants.hunts_id == user['hunts_id']).update({models.Participants.progress: data['progress']})
        models.db.session.commit()
        #updates the attempts  
        query = models.db.session.query(models.Participants).filter(models.Participants.email == user['email'], models.Participants.team_name == user['team_name'], models.Participants.hunts_id == user['hunts_id']).update({models.Participants.attempts: data['attempts']})
        models.db.session.commit()
        #updates the hints
        query = models.db.session.query(models.Participants).filter(models.Participants.email == user['email'], models.Participants.team_name == user['team_name'], models.Participants.hunts_id == user['hunts_id']).update({models.Participants.hints: data['hints']})
        models.db.session.commit()
        #updates the score
        query = models.db.session.query(models.Participants).filter(models.Participants.email == user['email'], models.Participants.team_name == user['team_name'], models.Participants.hunts_id == user['hunts_id']).update({models.Participants.score: data['score']})
        models.db.session.commit()
        
        query = models.db.session.query(models.Participants).filter(models.Participants.email == user['email'], models.Participants.team_name == user['team_name'], models.Participants.hunts_id == user['hunts_id'])
        for row in query:
            if row.start_time != None and row.end_time != None:
                # elapsed = getTimeElapsed(str(row.end_time-row.start_time))
                time = timeScore((row.end_time-row.start_time).total_seconds())
                userData = {'email':user['email'], 'team_name':user['team_name'], 'hunts_id':user['hunts_id'], 'progress':data['progress'], 'score':data['score'] + time, 'attempts':data['attempts'], 'hints':data['hints'], 'start_time':user['start_time'], 'end_time':user['end_time'].strftime("%Y-%m-%d %H:%M:%S")}
                query = models.db.session.query(models.Participants).filter(models.Participants.email == user['email'], models.Participants.team_name == user['team_name'], models.Participants.hunts_id == user['hunts_id']).update({models.Participants.score: data['score']+time})
                models.db.session.commit()
                return json.dumps({'user':userData})
                
        userData = {'email':user['email'], 'team_name':user['team_name'], 'hunts_id':user['hunts_id'], 'progress':data['progress'], 'score':data['score'], 'attempts':data['attempts'], 'hints':data['hints'], 'start_time':user['start_time'], 'end_time':user['end_time']}
        return json.dumps({'user':userData})
    except Exception as e: 
        print(e)
        
        
# def getTimeElapsed(time):
#     if "days" in time: #mulitple days
#         if len(time) == 24: #mulitple days over 10 hours
#                 return time[0] + time[1] + "days, " + time[9] + "" + time[10] + " hours, " + time[12] + "" + time[13] + " minutes, " + time[15] + "" + time[16] + " seconds"
#         if len(time) == 23: #mulitple days over 10 hours
#             return time[0] + "days, " + time[8] + "" + time[9] + " hours, " + time[11] + "" + time[12] + " minutes, " + time[14] + "" + time[15] + " seconds"
#         else:#mulitple days under 10 hours
#             return time[0] + "days, " + time[8] + " hour(s), " + time[10] + "" + time[11] + " minutes, " + time[13] + "" + time[14] + " seconds"
#     if "day," in time: #one day
#         if len(time) == 22: #one day and over 10 hours
#             return time[0] + "day, " + time[7] + "" + time[8] + " hours, " + time[10] + "" + time[11] + " minutes, " + time[13] + "" + time[14] + " seconds"
#         else:#one day under 10 hours
#             return time[0] + "day, " + time[7] + " hour(s), " + time[9] + "" + time[10] + " minutes, " + time[12] + "" + time[13] + " seconds"
#     if len(time) == 15: #over 10 hours
#         return time[0] + time[1] + " hours, " + time[3] + "" + time[4] + " minutes, " + time[6] + "" + time[7] + " seconds"
#     else: #below 10 hours
#         return time[0] + " hour(s), " + time[2] + "" + time[3] + " minutes, " + time[5] + "" + time[6] + " seconds"
    
def timeScore(total):
    print("in Timescore")
    hours = total / 60 / 60;
    if(hours <= 2):
        score = 500
    else:
        score = 500 - (60 * (int(hours) - 2))
        if(score < 0):
            score = 0
    return score

@socketio.on('updateTime')
def updateTime(data):
    print("In updateTime")
    user = data['user']
    if(data['start_time'] != ""):
        print("Start Time")
        try:
            #updates end_time
            query = models.db.session.query(models.Participants).filter(models.Participants.email == user['email'], models.Participants.team_name == user['team_name'], models.Participants.hunts_id == user['hunts_id']).update({models.Participants.start_time: datetime.datetime.now()})
            models.db.session.commit()
        
        except Exception as e: 
            print(e)
    if(data['end_time'] != ""):
        print("End Time")
        try:
            #updates end_time
            query = models.db.session.query(models.Participants).filter(models.Participants.email == user['email'], models.Participants.team_name == user['team_name'], models.Participants.hunts_id == user['hunts_id']).update({models.Participants.end_time: datetime.datetime.now()})
            models.db.session.commit()
        
        except Exception as e: 
            print(e)

@socketio.on('leaderboard')
def updateLeaderboard(data):
    leaderboardUser = []
    team = []
    try:
        sql = models.db.session.query(
            models.Participants.progress,
            models.Participants.score,
            models.Participants.team_name,
            models.Participants.start_time,
            models.Participants.end_time).filter(
                sqlalchemy.and_(
                    models.Participants.progress == -1,
                    models.Participants.end_time != None
                    )).order_by(models.Participants.score.desc())

        for row in sql:
            leaderboardUser.append({'progress':row.progress, 'score':row.score,'team_name':row.team_name, 'start_time':row.start_time.strftime('%Y-%m-%d %H:%M:%S'),'end_time':row.end_time.strftime('%Y-%m-%d %H:%M:%S')})

    except:
        print("Error: leaderboard query broke")
    socketio.emit('users', {
        'userlist': leaderboardUser
    })
    print('Leaderboard data sent.')

# @socketio.on('start')
# def updateStart():
#     socketio.emit('updateStart');
    
@socketio.on('register')
def updateRegister(data):
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
    hunts = models.Hunts(data['name'], data['type'], data['desc'], data['image'], data['sDate'], data['eDate'], data['sDate'])
    models.db.session.add(hunts)  
    models.db.session.commit()
    
    questions = models.Questions(data['question'], data['answer'], data['image'], data['hint1'], data['hint2'], data[x])
    models.db.session.add(questions)
    models.db.session.commit()
    x += 1
    # user = models.Participants("andramirez@csumb.edu", "Yo Mama", "image", "1234", "12", datetime.datetime.now().time(), "1")
    
@socketio.on('checkUserInfo')
def checkUserInfo(data):
    userdata = data['userdata']
    print(userdata)
    if models.db.session.query(models.Participants).filter(models.Participants.email == userdata['email'], models.Participants.hunts_id == userdata['hunts_id']).count() > 0:
        return json.dumps({'condition':'reject','message':"Email address already registered for this hunt."})
    elif models.db.session.query(models.Participants).filter(models.Participants.team_name == userdata['team_name']).count() > 0:
        return json.dumps({'condition':'reject','message':"Team name already registered for this hunt."})
    else:
        price = calculatePrice(userdata['discount_code'])
        print(price)
        return json.dumps({'condition':'accept','price':price})
    
def calculatePrice(discount_code):
    price = 50
    total_percent = 100
    try:
        discount_query = models.db.session.query(models.Discounts)
        for row in discount_query:
            if check_password(row.code, discount_code) and r.uses > 0:
                total_percent = discount_query.first().percent
                discount_query.first().uses -= 1
                models.db.session.commit()
                break
    except:
        print("Error: couldn't connect to discount table")
        pass
    
    # price's base unit is one cent, so 100 = $1
    price = price * (100 - total_percent)
    
    return price

@socketio.on('checkout')
def checkout(data):
    stripe.api_key = "sk_test_O6BW3ED77qHecdLRd832IdjW"
    token = data['token']
    userdata = data['userdata']
    team_name = userdata['team_name']
    client_email = userdata['email']
    hunt_id = userdata['hunts_id']
    price = data['price']
    
    # create account
    random.seed();
    random_number = random.randint(0,9999)
    hunt_name = models.db.session.query(models.Hunts).filter(models.Hunts.id == hunt_id).first().name
    hunt_name = ''.join(e for e in hunt_name if e.isalnum())
    leader_code = hunt_name + "{:04d}".format(random_number)
    
    random.seed();
    random_number = random.randint(0,9999)
    member_code = hunt_name + "{:04d}".format(random_number)
    
    participants = None
    try:
        participants = models.Participants(client_email, team_name, userdata['image'], hash_password(leader_code), hash_password(member_code), None, None, 0, 0, 0, -1, False, hunt_id)
        models.db.session.add(participants)  
        models.db.session.commit()
        
        participants = models.db.session.query(models.Participants).filter(models.Participants.team_name == team_name)
    except:
        return json.dumps({'condition':'reject','message':'Could not connect to database.'})
    
    try:
        if price != 0:
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
        return json.dumps({'condition':'not_paid','leader_code':leader_code, 'member_code':member_code, 'error_code':err.get('code')})
    except stripe.error.StripeError as e:
        return json.dumps({'condition':'not_paid','leader_code':leader_code, 'member_code':member_code, 'error_code':None})
    
    # send email
    try:
        subject = "Coastal Quest Activation Code"
        message = "Welcome to Coastal Quest Scavenger Hunts, {}! \nHere is your access code to play the hunt: \nTeam Leader: {} \nAnd here is a code to share with your teammates: \nTeam Members: {}. \nHave fun on your journey!".format(team_name,leader_code,member_code)
        email_client(client_email,subject,message)
    except:
        print("Error: Could not send email")
        pass
    
    # send access code back to JS app
    return json.dumps({'condition':'confirm','leader_code':leader_code, 'member_code':member_code})
    
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
    salt = uuid.uuid4().hex + uuid.uuid4().hex
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
