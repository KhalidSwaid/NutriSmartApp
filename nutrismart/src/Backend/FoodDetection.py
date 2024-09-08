# Importing necessary libraries
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import os
import numpy as np
import cv2 as cv
import tensorflow as tf

# Initializing Flask Application
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) # Allows CORS for all routes from any origin

# Ensure the static directory exists (adjusted path for your project structure)
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), '..', '..', 'static')  # Adjust path to 'static' in root

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Define a route for handling file uploads and predictions
@app.route('/upload_file', methods=['POST'])

def upload_file():
    if 'file' not in request.files:  # Checks if a file has been uploaded by the user
        return jsonify({"error": "No file provided"}), 400
    
    file = request.files['file']  # Access uploaded file by the user

    if file.filename == '':  # File not selected
        return jsonify({"error": "No selected file"}), 400
    
    # File path to save the uploaded file
    file_name = os.path.join(UPLOAD_FOLDER, file.filename)

    # Check if file exists before saving
    if not os.path.exists(file_name):  # If file does not exist, save it
        file.save(file_name)
    else:
        print(f"File {file.filename} already exists in {UPLOAD_FOLDER}. Using existing file.")

    # Preprocessing the image for prediction
    input_shape = (96, 96, 3)  # Input shape expected by the deep learning model
    model = tf.keras.models.load_model('best.h5')  # Load a pre-trained Keras model from a file
    image = cv.imread(file_name)  # Read the uploaded image
    image = cv.cvtColor(image, cv.COLOR_BGR2RGB)  # Convert color from BGR to RGB
    resized = cv.resize(image, (input_shape[1], input_shape[0]))  # Resize the image
    resized = (resized / 255.0).reshape(-1, input_shape[1], input_shape[0], input_shape[2])  # Normalize and reshape

    # Making predictions
    preds = model.predict(resized)
    preds = np.where(preds < 0.3, 0, 1)  # Convert probabilities to binary values (0 or 1)

    # Mapping predictions to class labels
    class_list = ['beef', 'bowl', 'bread', 'chicken', 'curry', 'eels', 'fried', 'green', 'hambarg', 'hamburger',
                  'noodle', 'pilaf', 'potato', 'raisin', 'rice', 'roast', 'salad', 'sandwiches', 'steak', 'tempura',
                  'tensin', 'udon']
    result = []  # Store the predicted labels

    for i in range(preds.shape[1]):
        if preds[0][i] == 1:
            result.append(class_list[i])

    # Return the prediction results as JSON
    return jsonify({"success": True, "message": "File uploaded successfully"}), 200


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5173)
