import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
import random

# Global Variables
GUESSES = []
CORRECT = []
INCORRECT = []
CATEGORIES = ['animals', 'food', 'programming languages']
WORDS = {
    'animals': [
        'dog', 
        'pig', 
        'cat', 
        'cow', 
        'bat', 
        'aligator', 
        'pigeon',
        'gorilla'
    ],
    'food': [
        'pizza',
        'mushroom',
        'beans',
        'shrimp',
        'potato'
    ],
    'programming languages': [
        'ada',
        'python',
        'java',
        'javascript',
        'fortran',
        'cobol'
    ]
}
SELECTED_CATEGORY = CATEGORIES[random.randint(0, len(CATEGORIES) - 1)]
SELECTED_WORD = SELECTED_CATEGORY[0]
GAME_IN_PROGRESS = False

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
    Called when a socket connects
    """
    global CATEGORIES
    SOCKET_IO.emit('categories', CATEGORIES, broadcast=True)

@SOCKET_IO.on('disconnect')
def on_disconnect():
    """
    Called after a socket disconnects
    """
    print('User disconnected!')

@SOCKET_IO.on('generate word')
def on_generate_word(category):
    """
    Called when a category is selected
    """
    global WORDS
    word_bank = WORDS[category]
    word = word_bank[random.randint(0, len(word_bank) - 1)]
    SOCKET_IO.emit('word generated', word, broadcast=True)

@SOCKET_IO.on('guess')
def on_guess(guess): 
    """
    Called after a guess is submitted. Checks to see if the guess is correct or incorrect.
    """
    print('correct word: ' + SELECTED_WORD)
    print(type(guess))
    check(guess)
    # stuff = {
    #     'correct':correct,
    #     'incorrect':incorrect,
    #     'guesses':guesses
    # }
    # socketio.emit('guess', stuff, broadcast=True, include_self=True)

def check(guess):
    if guess in SELECTED_WORD:
        print('correct')
    else:
        print('incorrect')

if __name__ == "__main__":
    SOCKET_IO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
