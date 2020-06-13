from flask import Flask
from flask import request
from flask_cors import CORS
from flask_mysqldb import MySQL
import time
import json
import jwt

app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'karthick98'
app.config['MYSQL_DB'] = 'food_delivery'

CORS(app)
mysql = MySQL(app)

@app.route("/")
def home():
    return "Home"

# New User - Create Account
@app.route("/user/register", methods=["POST"])
def userRegister():
    name = request.json["name"]
    email = request.json["email"]
    username = request.json["username"]
    password = request.json["password"]

    cur = mysql.connection.cursor()

    cur.execute(''' SELECT username from user ''')
    result = cur.fetchall()

    flag = False

    if username in result:
        flag = True

    if flag:
        return json.dumps({"message":"Username already exists!", "error":True})
    else:
        cur.execute(''' INSERT INTO user(name, email, username, password) VALUES("%s", "%s", "%s", "%s"); ''' %(name, email, username, password))
        mysql.connection.commit()
        cur.close()

        return json.dumps({"message":"Created Account successfully!", "error":False})

# User - Login
@app.route("/user/login", methods=["POST"])
def userLogin():
    username = request.json["username"]
    password = request.json["password"]

    cur = mysql.connection.cursor()

    cur.execute(''' SELECT username,password FROM user ''')
    result = cur.fetchall()

    flag = False

    for i in result:
        if i[0] == username:
            if i[1] == password:
                flag = True

    if flag:
        payload = {
            "username": username,
            "status": "Logged In",
            "session_expiry": time.time() + 7200
        }

        key = "belly"

        encode = jwt.encode(payload, key)

        return json.dumps({"token":encode.decode(), "message":"Login Successful", "error":False})
    else:
        return json.dumps({"message":"Login Failed", "error":True})

# User Token Authentication
@app.route("/user_token_validate", methods=['POST'])
def userToken():
    token = request.json["token"]

    key = "belly"

    data = jwt.decode(token, key)

    current_time = time.time()

    if data["session_expiry"] < current_time:
        return json.dumps({
            "error":True,
            "message":"Invalid Token"
        })
    else:
        return json.dumps({
            "error":False,
            "message":"Valid Token"
        })
@app.route('/restaurant', methods=['POST'])
def addRestaurant():
    location = request.json['location']
    name = request.json['name']
    rating = request.json['rating']
    description = request.json['description']
    phoneno = request.json['mobile']
    owner = request.json['owner']

    cur = mysql.connection.cursor()
    
    cur.execute(''' INSERT INTO hotel(name, location, rating, description, mobile, owner) VALUES("%s", "%s", "%s", "%s", "%s", "%s"); ''' % (
        name, location, rating, description, phoneno, owner))
    mysql.connection.commit()
    cur.close()

    return json.dumps({"message": "Restaurant Added successfully", "error": False})


@app.route('/restaurant', methods=['GET'])
def viewAllRestaurants():
    cur = mysql.connection.cursor()
    cur.execute(''' SELECT * from restaurant ''')
    result = cur.fetchall()
    return json.dumps({"Restaurants": result})