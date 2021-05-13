import os

from flask import Flask, render_template
from flask_socketio import SocketIO, emit, join_room, leave_room

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app, cors_allowed_origin="*")

# Config variables for SocketIO
channels = {}
channels['General'] = []

# List all channels except General channel
channels_list = []
private_messages = {}
users_lists = {}
LIMIT = 100

# Routes functions
@app.route("/")
def index():
    return render_template('index.html')

# Sockets functions
@socketio.on('connect')
def connect():
    emit("load channels", { 'channels': channels })

@socketio.on('submit to all')
def general_message(data):
    message = { 'text': data["my_message"], 'username': data["username"], 'time': data["time"] }
    channels['General'].append(message)

    if (len(channels['General']) > 100):
        channels['General'].pop(0)

    emit('message to all', { 'channels': channels }, broadcast = True)

@socketio.on('return to general')
def return_to_general():
    emit('announce to all', { 'channels': channels }, broadcast = True)

@socketio.on('new username')
def new_user(data):
    username = ""
    error = ""

    if data['username'] in users_list:
        error="Username already exists. Try again with other username"
    else:
        users_list[data['username']] = request.sid
        username = data['username']

    emit('add username', { "username": username, "error": error })

if __name__ == '__main__':
    socketio.run(app)
