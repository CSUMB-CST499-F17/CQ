import os, flask, flask_socketio, flask_sqlalchemy, time, stripe
import models
x = 1

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)

@app.route('/')
def hello():
    getHunt()
    return flask.render_template('index.html')

@socketio.on('createHunt')
def createHunt(data):
    global x
    print data
    hunts = models.Hunts(data['name'], data['type'], data['desc'], data['image'], data['sDate'], data['eDate'], data['sDate'])
    models.db.session.add(hunts)  
    models.db.session.commit()
    
    questions = models.Questions(data['question'], data['answer'], data['image'], data['hint1'], data['hint2'], data[x])
    models.db.session.add(questions)  
    models.db.session.commit()
    x += 1
    
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
    question = []
    question = "Find California's first theatre.  On the front door, there is a poem.  Who is the poem about?"
    
    socketio.emit('hunt', {
        'questions': question
    })

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