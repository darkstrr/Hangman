import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
import random

# Global Variables
GUESSES = []
CORRECT = []
INCORRECT = []
WORDS = []
# SELECT = random.randint(0,len(words))
# WORD = words[select]

APP = Flask(__name__, static_folder='./build/static')
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS = CORS(APP, resources={r"/*": {"origins": "*"}})

SOCKET_IO = SocketIO(
    APP,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    """
    End point to serve web application
    """
    return send_from_directory('./build', filename)

@SOCKET_IO.on('connect')
def on_connect():
    """
    Called a socket connects
    """
    print('User connected!')

@SOCKET_IO.on('disconnect')
def on_disconnect():
    """
    Called a socket disconnects
    """
    print('User disconnected!')

@SOCKET_IO.on('guess')
def on_guess(data): 
    """
    Called a guess is submitted. Checks to see if the guess is correct or incorrect.
    """
    print('in here')
    print(data)
    # check(str(data))
    # stuff = {
    #     'correct':correct,
    #     'incorrect':incorrect,
    #     'guesses':guesses
    # }
    # socketio.emit('guess', stuff, broadcast=True, include_self=True)

if __name__ == "__main__":
    SOCKET_IO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
