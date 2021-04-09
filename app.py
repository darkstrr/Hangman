import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
import random

app = Flask(__name__, static_folder='./build/static')
guesses = []
correct = []
incorrect = []
words = []
select = random.randint(0,len(words))
word = words[select]

# Gets rid of a warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
cors = CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)

def check(guess):
    guess.append(guess)
    if guess in words:
        correct.append(guess)
    else:
        incorrect.append(guess)

# When a client connects from this Socket connection, this function is run
@socketio.on('connect')
def on_connect():
    print('User connected!')

# When a client disconnects from this Socket connection, this function is run
@socketio.on('disconnect')
def on_disconnect():
    print('User disconnected!')

# When a client emits the event 'chat' to the server, this function is run
# 'chat' is a custom event name that we just decided
@socketio.on('guess')
def on_guess(data): # data is whatever arg you pass in your emit call on client
    print(str(data))
    check(str(data))
    stuff = {
        'correct':correct,
        'incorrect':incorrect,
        'guesses':guesses
    }
    socketio.emit('guess', stuff, broadcast=True, include_self=True)

# Note we need to add this line so we can import app in the python shell
if __name__ == "__main__":
# Note that we don't call app.run anymore. We call socketio.run with app arg
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
