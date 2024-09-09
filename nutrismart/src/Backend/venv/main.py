# from flask import Flask, jsonify, request
# from flask_cors import CORS
# import os
# import cv2 as cv
# import base64
# import numpy as np
# import tensorflow as tf

# app = Flask(__name__)

# # Adjust the path relative to the current file (__file__) to point to the 'static' folder in the project root
# UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'static')

# # Create the 'static' directory if it does not exist
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)

# # Initialize CORS with the app
# CORS(app, resources={r"/*": {"origins": "*"}})

# def load_model_and_get_input_shape():
#     """Load model from 'best_model.hdf5' and return its input shape."""
#     try:
#         # Directly load the model from the file 'best_model.hdf5'
#         model = tf.keras.models.load_model('best_model.hdf5')
#         input_shape = model.input_shape  # Get model input shape
#         return model, input_shape
#     except Exception as e:
#         print(f"Error loading model: {e}")
#         raise

# @app.route("/upload_file", methods=['POST'])
# def upload_file():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file provided"}), 400
    
#     file = request.files['file']
    
#     if file.filename == '':  # File not selected
#         return jsonify({"error": "No selected file"}), 400
    
#     # Save the file to the specified UPLOAD_FOLDER
#     try:
#         file_name = file.filename
#         save_path = os.path.join(UPLOAD_FOLDER, file_name)
#         file.save(save_path)  # Save the file

#         # Open the image using OpenCV
#         image = cv.imread(save_path)

#         if image is None:
#             return jsonify({"error": "Failed to read the image."}), 500
        
#         # Load the model and get the expected input shape
#         model, input_shape = load_model_and_get_input_shape()
#         print(f"Model input shape: {input_shape}")  # Debugging output

#         # Check if input_shape is valid
#         if len(input_shape) != 4:
#             return jsonify({"error": f"Unexpected input shape from model: {input_shape}"}), 500
        
#         # Preprocessing the image for prediction
#         try:
#             # Convert color from BGR to RGB
#             image = cv.cvtColor(image, cv.COLOR_BGR2RGB)

#             # Resize image to the model's expected input shape
#             height, width = input_shape[1], input_shape[2]  # Extract expected height and width
#             resized = cv.resize(image, (width, height))

#             # Normalize and reshape the image for model prediction
#             resized = np.expand_dims(resized, axis=0)  # Add batch dimension
#             resized = resized / 255.0  # Normalize pixel values to [0, 1]

#             # Making predictions
#             preds = model.predict(resized)
#             preds = np.where(preds < 0.3, 0, 1)  # Convert probabilities to binary values (0 or 1)

#             # Mapping predictions to class labels
#             class_list = ['beef', 'bowl', 'bread', 'chicken', 'curry', 'eels', 'fried', 'green', 'hambarg', 'hamburger',
#                           'noodle', 'pilaf', 'potato', 'raisin', 'rice', 'roast', 'salad', 'sandwiches', 'steak', 'tempura',
#                           'tensin', 'udon']
#             result = []  # Store the predicted labels

#             for i in range(preds.shape[1]):
#                 if preds[0][i] == 1:
#                     result.append(class_list[i])

#             # Optional: Convert the image to base64 string (if you want to send the image back)
#             with open(save_path, "rb") as image_file:
#                 base64_image = base64.b64encode(image_file.read()).decode('utf-8')

#             # Optional: Remove file after processing if not needed
#             # os.remove(save_path)

#             # Return JSON response with prediction results and image information
#             return jsonify({
#                 "success": True,
#                 "message": "File uploaded and processed successfully",
#                 "file_name": file_name,
#                 "image_shape": image.shape,  # JSON serializable
#                 "base64_image": base64_image,  # If needed
#                 "predictions": result  # Predicted labels
#             }), 200

#         except Exception as e:
#             print(f"Error during image preprocessing or prediction: {e}")
#             return jsonify({"error": "An error occurred while preprocessing the image or making a prediction."}), 500

#     except Exception as e:
#         print(f"Error processing file: {e}")
#         return jsonify({"error": "An error occurred while processing the file."}), 500

# if __name__ == "__main__":
#     app.run(debug=True, port=8080)
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import cv2 as cv
import base64
import numpy as np
import tensorflow as tf

app = Flask(__name__)

# Adjust the path relative to the current file (__file__) to point to the 'static' folder in the project root
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'static')

# Create the 'static' directory if it does not exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Initialize CORS with the app
CORS(app, resources={r"/*": {"origins": "*"}})

# Load the pre-trained MobileNetV2 model
model = tf.keras.applications.MobileNetV2(weights='imagenet')

def preprocess_image(image_path):
    """Load and preprocess the image for prediction."""
    # Load the image using OpenCV
    image = cv.imread(image_path)
    
    # Convert the image from BGR to RGB format (OpenCV loads in BGR format)
    image = cv.cvtColor(image, cv.COLOR_BGR2RGB)
    
    # Resize the image to 224x224 pixels (input size for MobileNetV2)
    image = cv.resize(image, (224, 224))
    
    # Convert to array and normalize pixel values to [0, 1]
    image = np.array(image) / 255.0
    
    # Expand dimensions to fit the model input
    image = np.expand_dims(image, axis=0)
    
    return image

def predict_food(image_path):
    """Predict the contents of a food image."""
    # Preprocess the image
    processed_image = preprocess_image(image_path)
    
    # Make predictions using the pre-trained model
    predictions = model.predict(processed_image)
    
    # Decode predictions to get human-readable labels
    decoded_predictions = tf.keras.applications.mobilenet_v2.decode_predictions(predictions, top=3)[0]
    
    # Extract the top predicted labels and their probabilities, convert probabilities to float
    result = [(label, float(prob)) for (_, label, prob) in decoded_predictions]
    
    # Return the predictions
    return result

@app.route("/upload_file", methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400
    
    file = request.files['file']
    
    if file.filename == '':  # File not selected
        return jsonify({"error": "No selected file"}), 400
    
    # Save the file to the specified UPLOAD_FOLDER
    try:
        file_name = file.filename
        save_path = os.path.join(UPLOAD_FOLDER, file_name)
        file.save(save_path)  # Save the file

        # Open the image using OpenCV
        image = cv.imread(save_path)

        if image is None:
            return jsonify({"error": "Failed to read the image."}), 500
        
        # Predict the food in the image
        try:
            predictions = predict_food(save_path)  # Use the new function for prediction

            # Optional: Convert the image to base64 string (if you want to send the image back)
            with open(save_path, "rb") as image_file:
                base64_image = base64.b64encode(image_file.read()).decode('utf-8')

            # Optional: Remove file after processing if not needed
            # os.remove(save_path)

            # Return JSON response with prediction results and image information
            return jsonify({
                "success": True,
                "message": "File uploaded and processed successfully",
                "file_name": file_name,
                "image_shape": image.shape,  # JSON serializable
                "base64_image": base64_image,  # If needed
                "predictions": predictions  # Predicted labels
            }), 200

        except Exception as e:
            print(f"Error during image preprocessing or prediction: {e}")
            return jsonify({"error": "An error occurred while preprocessing the image or making a prediction."}), 500

    except Exception as e:
        print(f"Error processing file: {e}")
        return jsonify({"error": "An error occurred while processing the file."}), 500

if __name__ == "__main__":
    app.run(debug=True, port=8080)
