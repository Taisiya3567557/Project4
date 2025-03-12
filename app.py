from flask import Flask, request
from flask_socketio import SocketIO, emit
import base64

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

users = {}

@socketio.on("connect")
def handle_connect():
    print("User connected")

@socketio.on("join")
def handle_join(username):
    users[request.sid] = username
    emit("user_joined", {"username": username}, broadcast=True)

@socketio.on("message")
def handle_message(data):
    username = users.get(request.sid, "Unknown")
    emit("message", {"username": username, "message": data["message"]}, broadcast=True)

@socketio.on("image")
def handle_image(data):
    username = users.get(request.sid, "Unknown")
    image_data = data["image"]
    
    # Отправляем изображение всем пользователям
    emit("image", {"username": username, "image": image_data}, broadcast=True)

@socketio.on("disconnect")
def handle_disconnect():
    if request.sid in users:
        username = users.pop(request.sid)
        emit("user_left", {"username": username}, broadcast=True)

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)
