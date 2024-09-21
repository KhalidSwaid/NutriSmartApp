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
    """Predict the contents of a food image and return the top prediction."""
    # Preprocess the image
    processed_image = preprocess_image(image_path)
    
    # Make predictions using the pre-trained model
    predictions = model.predict(processed_image)
    
    # Decode predictions to get human-readable labels
    decoded_predictions = tf.keras.applications.mobilenet_v2.decode_predictions(predictions, top=1)[0]  # Get only top 1 prediction
    
    # Extract the top predicted label and its probability
    top_prediction = decoded_predictions[0]
    label, probability = top_prediction[1], float(top_prediction[2])
    
    # Return the top prediction as a tuple
    return (label, probability)

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
            prediction = predict_food(save_path)  # Use the new function for prediction

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
                "prediction": {
                    "label": prediction[0],
                    "probability": prediction[1]
                }  # Only the top predicted label and its probability
            }), 200

        except Exception as e:
            print(f"Error during image preprocessing or prediction: {e}")
            return jsonify({"error": "An error occurred while preprocessing the image or making a prediction."}), 500

    except Exception as e:
        print(f"Error processing file: {e}")
        return jsonify({"error": "An error occurred while processing the file."}), 500

if __name__ == "__main__":
    app.run(debug=True, port=8080)
