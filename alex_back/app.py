from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import exc
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_mail import Mail, Message
import jwt
import os


app = Flask(__name__)
CORS(app)

basedir =  os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = 'postgres://tooffvfkoajacj:501d73927e7fc896f5b72ecaac41cb50e43ead733f056ecacb9a21be89fd2c7c@ec2-52-5-167-89.compute-1.amazonaws.com:5432/d9hp70e35dtmiu'
app.config['MAIL_SERVER']='sandbox.smtp.mailtrap.io'
app.config['MAIL_PORT'] = 2525
app.config['MAIL_USERNAME'] = '4c5c7c9bedec3a'
app.config['MAIL_PASSWORD'] = '33ee1669a06b85'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False



mail = Mail(app)

db = SQLAlchemy(app)
ma = Marshmallow(app)
bc = Bcrypt(app)

class Content(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    title = db.Column(db.String)
    content = db.Column(db.String)
    link = db.Column(db.String)

    def __init__(self, name, title, content, link):
        self.name = name
        self.title = title
        self.content = content
        self.link = link

class ContentSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'title', 'content', 'link')
content_schema = ContentSchema()
all_content_schema = ContentSchema(many=True)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True)

    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'username', 'password', 'email')

user_schema = UserSchema()
multi_user_schema = UserSchema(many=True)

class Video(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    video_name = db.Column(db.String(15), nullable=False, unique=True)
    video_description = db.Column(db.String)
    video_length = db.Column(db.String)
    video_size = db.Column(db.Integer)
    video_tags = db.Column(db.String)
    video_link = db.Column(db.String)

    def __init__(self, video_name, video_description, video_length, video_size, video_tags, video_link):
        self.video_name = video_name
        self.video_description = video_description
        self.video_length = video_length
        self.video_size = video_size
        self.video_tags = video_tags
        self.video_link = video_link


class VideoSchema(ma.Schema):
    class Meta:
        fields = ('id', 'video_name', 'video_description', 'video_length', 'video_size', 'video_tags', 'video_link')

video_schema = VideoSchema()
multi_video_schema = VideoSchema(many=True)

def generate_token(user_id):
    payload = {"user_id": user_id}
    token = jwt.encode(payload, "dragon_balls", algorithm="HS256")
    return token

#User Endpoints

@app.route("/user/create", methods=["POST"])
def create_user():
    if request.content_type != "application/json":
        return jsonify("Error: Please send in JSON", 400)
    
    post_data = request.get_json()
    username = post_data.get("username")
    password = post_data.get("password")
    email = post_data.get("email")

    pw_hash = bc.generate_password_hash(password, 12).decode('utf-8')
    
    new_user = User(username, pw_hash, email)
    db.session.add(new_user)
    db.session.commit()

    return jsonify("User Created", user_schema.dump(new_user))

@app.route("/verify", methods=["POST"])
def verify():
    if request.content_type != "application/json":
        return jsonify({"error": "Error: Please send in JSON"}), 400

    post_data = request.get_json()
    username = post_data.get("username")
    password = post_data.get("password")
    email = post_data.get("email")

    user = User.query.filter(
        (User.username == username) | (User.email == email)
    ).first()

    if user is None:
        return jsonify({"error": "User information is required"}), 404

    if bc.check_password_hash(user.password, password):
        token = generate_token(user.id)
        response = make_response(jsonify({"token": token}), 200)
        response.set_cookie('token', token, httponly=True)
        return response

    return jsonify({"error": "User information not verified"}), 404

    
@app.route('/user/get')
def get_users():
    users = db.session.query(User).all()
    return jsonify(multi_user_schema.dump(users))

@app.route('/user/delete/<id>', methods=["DELETE"])
def delete_user(id):
    delete_user = db.session.query(User).filter(User.id == id).first()
    db.session.delete(delete_user)
    db.session.commit()
    return jsonify("User deleted")

@app.route('/user/update/<id>', methods=["PUT"])
def edit_user(id):
    if request.content_type != 'application/json':
        return jsonify("Error:", 400)
    put_data = request.get_json()
    username = put_data.get('username')
    email = put_data.get('email')
    
    edit_user = db.session.query(User).filter(User.id == id).first()

    if username != None:
        edit_user.username = username
    if email != None:
        edit_user.email = email

    db.session.commit()
    return jsonify("User Information Has Been Updated!")

@app.route('/.user/editpw/<id>', methods=["PUT"])
def edit_pw(id):
    if request.content_type != 'application/json':
        return jsonify("Error updating PW")
    password = request.get_json().get("password")
    user = db.session.query(User).filter(User.id == id).first()
    pw_hash = bc.generate_password_hash(password, 15).decode('utf-8')
    user.password = pw_hash

    db.session.commit()

    return jsonify("Password Changed Successfully=", user_schema.dump(user))

#Portfolio Endpoints

@app.route("/video/add", methods=["POST"])
def add_video():
    if request.content_type != "application/json":
        return jsonify("Error: Please send in JSON", 400)
    
    post_data = request.get_json()
    video_name = post_data.get("video_name")
    video_description = post_data.get("video_description")
    video_length = post_data.get("video_length")
    video_size = post_data.get("video_size")
    video_tags = post_data.get("video_tags")
    video_link = post_data.get("video_link")
    
    new_video = Video(video_name, video_description, video_length, video_size, video_tags, video_link)
    db.session.add(new_video)
    db.session.commit()

    return jsonify("Video Added", video_schema.dump(new_video))

@app.route('/video/all')
def get_videos():
    videos = db.session.query(Video).all()
    return jsonify(multi_video_schema.dump(videos))

@app.route('/video/<id>')
def get_video(id):
    video = db.session.query(Video).filter(Video.id == id).first()
    return jsonify(video_schema.dump(video))

@app.route('/video/delete/<id>', methods=["DELETE"])
def delete_video(id):
    delete_video = db.session.query(Video).filter(Video.id == id).first()
    db.session.delete(delete_video)
    db.session.commit()
    return jsonify("Video deleted")

@app.route('/video/update/<id>', methods=["PUT"])
def edit_video(id):
    if request.content_type != 'application/json':
        return jsonify("Error:", 400)
    put_data = request.get_json()
    video_name = put_data.get("video_name")
    video_description = put_data.get("video_description")
    video_length = put_data.get("video_length")
    video_size = put_data.get("video_size")
    video_tags = put_data.get("video_tags")
    video_link = put_data.get("video_link")
    
    edit_video = db.session.query(Video).filter(Video.id == id).first()

    if edit_video is None:
        return jsonify({"error": "Video not found"}), 404

    if video_name is not None:
        edit_video.video_name = video_name
    if video_description is not None:
        edit_video.video_description = video_description
    if video_length is not None:
        edit_video.video_length = video_length
    if video_size is not None:
        edit_video.video_size = video_size
    if video_tags is not None:
        edit_video.video_tags = video_tags
    if video_link is not None:
        edit_video.video_link = video_link

    db.session.commit()
    return jsonify({"message": "Video information has been updated"})

#Email Endpoint

@app.route('/send-email', methods=['POST'])
def send_email():
    email = request.json.get('email')
    message = request.json.get('message')

    msg = Message('New Contact Form Submission',
        sender="shaywhytee@gmail.com",
        recipients=['swensen42@gmail.com'])
    msg.body = f"Email: {email}\n\n Message: {message}"

    try:
        mail.send(msg)
        return {'success': 'Email sent successfully'}
    except Exception as e:
        return {'error': 'Failed to send email', 'error': str(e)}
    
# Content Endpoints
    
@app.route('/create/content', methods=['POST'])
def create_content():
    if request.content_type != "application/json":
        return jsonify("Error: Please send in JSON", 400)
    
    post_data = request.get_json()
    name = post_data.get("name")
    title = post_data.get("title")
    content = post_data.get("content")
    link = post_data.get("link")

    
    new_content = Content(name, title, content, link)
    db.session.add(new_content)
    db.session.commit()

    return jsonify("Content Added", content_schema.dump(new_content))

@app.route('/create/content/many', methods=['POST'])
def create_content_many():
    if request.content_type != "application/json":
        return jsonify("Error: Please send in JSON", 400)
    
    post_data = request.get_json()

    if not post_data or not isinstance(post_data, list):
        return jsonify("Error: Invalid submission", 400)
    
    created_content = []

    for content_data in post_data:
        name = content_data.get("name")
        title = content_data.get("title")
        content = content_data.get("content")
        link = content_data.get("link")

        new_content = Content(name=name, title=title, content=content, link=link)
        db.session.add(new_content)
        created_content.append(new_content)

    db.session.commit()
    return jsonify("Content Added", all_content_schema.dump(created_content))

@app.route('/get/content')
def get_content():
    content = db.session.query(Content).all()
    return (all_content_schema.dump(content))

@app.route('/content/update', methods=["PUT"])
def edit_content():
    if request.content_type != 'application/json':
        return jsonify("Error:", 400)


    put_data = request.get_json()
    changes = put_data.get('changes')

    if not changes or not isinstance(changes, list):
        return jsonify("Error: Invalid submission", 400)
    
    for change in changes:
        name = change.get('name')
        title = change.get('title')
        content = change.get('content')
        link = change.get('link')

        edit_content = db.session.query(Content).filter(Content.name == name).first()
        if not edit_content:
            return jsonify(f"Error:Content '{name}' not found", 404)

        if title is not None:
            edit_content.title = title
        if content is not None:
            edit_content.content = content
        if link is not None:
            edit_content.link = link

    db.session.commit()
    return jsonify("Content Has Been Updated!")

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)