import os, flask, flask_socketio, flask_sqlalchemy, time
# , stripe
import models

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)

@app.route('/')
def hello():
    return flask.render_template('index.html')

@socketio.on('createHunt')
def createHunt(data):
    print data
    
@socketio.on('checkout')
def checkout(data):
    stripe.api_key = "sk_test_BQokikJOvBiI2HlWgH4olfQ2"
    
    token = data['token']
    
    charge = stripe.Charge.create(
      amount=50,
      currency="usd",
      description="Coastal Quest Scavenger Hunt",
      source=token,
    )
    
    # create account
    # will get team_name, email, hunt_id
    
    # emit access code
    
    # send email

if __name__ == '__main__':
    socketio.run(
            app,
            host=os.getenv('IP', '0.0.0.0'),
            port=int(os.getenv('PORT', 8080)),
            debug=True,
            use_reloader=False
        )