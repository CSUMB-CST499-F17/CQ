import os, flask, flask_socketio, time

# from pokeType import pokeTy

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)

@app.route('/')
def hello():
    return flask.render_template('index.html')
    
# @socketio.on('explore')
# def play(data):
#     key = data['key']
#     if key in maps: #if grid for login already exists, load     
#         grid = maps[key]
#     else: #else create and save
#         key = generateKey()
#         grid = createGrid('medium') 
#         maps[key] = grid
#     playerData[request.sid]['currentSession'] = key
#     on_join({'username':playerData[request.sid]['name'],'room':playerData[request.sid]['currentSession']})
#     userPositions[request.sid] = playerData[request.sid]['location']
#     socketio.emit('draw pos', {'image': playerData[request.sid]['image'], 'pos': playerData[request.sid]['location']}, room=request.sid) #draw at starting location
# socketio.emit('game start', {'session': key, 'board': grid}, room=playerData[request.sid]['currentSession'])


if __name__ == '__main__':
   
    socketio.run(
            app,
            host=os.getenv('IP', '0.0.0.0'),
            port=int(os.getenv('PORT', 8080)),
            debug=True,
            use_reloader=False
        )