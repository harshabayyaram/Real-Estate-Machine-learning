from flask import Flask, request, jsonify
from flask_cors import CORS
import util
import firebase_admin
from firebase_admin import credentials, firestore, auth

app = Flask(__name__)
CORS(app)
# CORS(app, resources={r"/api/*": {"origins": "*"}})

# Initialize Firebase
cred = credentials.Certificate("./firebase_admin.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

util.load_saved_artifacts()


@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    return response


@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bhk = int(request.form['bhk'])
    bath = int(request.form['bath'])

    # Get estimated price using your machine learning model
    estimated_price = util.get_estimated_price(location, total_sqft, bhk, bath)

    # Save prediction to Firebase
    prediction_data = {
        'total_sqft': total_sqft,
        'location': location,
        'bhk': bhk,
        'bath': bath,
        'estimated_price': estimated_price
    }

    db.collection('predictions').add(prediction_data)

    response = jsonify({
        'estimated_price': estimated_price
    })
    return response


@app.route('/register', methods=['POST'])
def register():
    email = request.form['email']
    password = request.form['password']
    # print(email,"email from FE")

    try:
        user = auth.create_user(
            email=email,
            password=password
        )
        response = jsonify({'message': 'Registration successful'})
        return response

    except Exception as e:
        response = jsonify({'error': str(e)})
        return response



# @app.route('/login', methods=['POST'])
# def login():
#     email = request.form['email']
#     password = request.form['password']
#     print(email, "login email")
#     print(password,"password")

#     try:
#         # user = auth.get_user_by_email(email)
#         user = auth.signInWithEmailAndPassword(email, password)
#         print(user, "userrrrr")
#         response = jsonify({'message': 'Login successful'})
#         return response

#     # except auth.UserNotFoundError:
#     #     response = jsonify({'error': 'User not registered'})
#     #     return response

#     # except auth.WrongPasswordError:
#     #     response = jsonify({'error': 'Wrong password'})
#     #     return response

#     except Exception as e:
#         response = jsonify({'error': str(e)})
#         return response


# @app.route('/login', methods=['POST'])
# def login():
#     email = request.form['email']
#     password = request.form['password']

#     try:
# # Authenticate the user using Firebase Authentication
#         user = auth.get_user_by_email(email)
#         # No exceptions raised means user exists with this email
#         response = jsonify({'message': 'Login successful'})
#         return response

#     except Exception as e:
#         response = jsonify({'error': str(e)})
#         return response




if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    app.run(debug=True)






