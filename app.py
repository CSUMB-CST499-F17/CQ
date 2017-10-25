import os, flask, flask_socketio, flask_sqlalchemy, time, stripe, datetime, sqlalchemy
import models

#GLOBAL VARS
x = 1
teams = []

#REACT, FLASK, AND DB STUFF
app = flask.Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
socketio = flask_socketio.SocketIO(app)
db = flask_sqlalchemy.SQLAlchemy(app)

#FUNCTIONS
@app.route('/')
def hello():
    dropDown()
    return flask.render_template('index.html')

@socketio.on('play')
def getHunt():
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
    
    socketio.emit('hunt', {
        'questions': question
    })
    print('Scavenger hunt data sent.')
    
def dropDown():
    hunts = [];
    
    recent = models.db.session.query(models.Hunts)
    for row in recent:
        hunts.append({'name':row.name,'h_type':row.h_type,'desc':row.desc,'image':row.image,'start_time':row.start_time,'end_time':row.end_time,'start_text':row.start_text })
    print hunts
#     socketio.emit('hunt-info', hunts)

@socketio.on('ready')
def run():
    initData()

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
    sql = models.db.session.query(models.Hunts).filter(sqlalchemy.and_(models.Hunts.start_time <= datetime.datetime.now(),models.Hunts.end_time >= datetime.datetime.now())).order_by(models.Hunts.id.desc())
    for row in sql:
        ongoingHunts.append({'name':row.name,'h_type':row.h_type,'desc':row.desc,'image':row.image,'start_time':row.start_time,'end_time':row.end_time,'start_text':row.start_text })
    #datetime to string, not json serializable
    # socketio.emit('updateRegister', {
    #     'ongoingHunts': ongoingHunts
    # }) 

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
    
@socketio.on('checkout')
def checkout(data):
    stripe.api_key = "sk_test_O6BW3ED77qHecdLRd832IdjW"
    
    token = data['token']
    #userInfo = data['userInfo']
    
    charge = stripe.Charge.create(
      amount=50,
      currency="usd",
      description="Coastal Quest Scavenger Hunt",
      source=token['id'],
    )
    
    # create account
    # will get team_name, email, hunt_id
    
    # access_code = "Wowzers"
    # models.Participants.__init__(userInfo['email'],userInfo['team_name'], userInfo['image'], access_code, 0, 0, userInfo['hunts_id'])
    # socketio.emit('access', {'access_code':access_code});
    
    # send email

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