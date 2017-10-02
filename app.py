import os, flask, flask_socketio, flask_sqlalchemy, time

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)

import models

@app.route('/')
def hello():
    return flask.render_template('index.html')

if __name__ == '__main__':
    socketio.run(
            app,
            host=os.getenv('IP', '0.0.0.0'),
            port=int(os.getenv('PORT', 8080)),
            debug=True,
            use_reloader=False
        )