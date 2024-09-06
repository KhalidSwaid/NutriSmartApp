# Importing neccessary libraries
from flask import Flask, render_template, request
import os
import numpy as np
import cv2 as cv
from PIL import Image
import matplotlib.pyplot as plt
import tensorflow as tf

# Initializing Flask Application
app = Flask(__name__)

# Define a route for the web application
@app.route('/', methods=['GET', 'POST'])


def read_file():
  if request.method == 'POST':
    if 'file' not in request.files: # Checks if a file has been uploaded by the user
      return "There is No File!"
    
    file = request.files['file'] # Access uploaded file by the user

    if file.filename == '': # File not selected
      return "No Selected File!"
    
    if file: # If the file is uploaded and selected
      file_content = file.read() # Read content from file , read() returns the file's content as bytes
      with open(os.path.join('static', file.filename), 'wb') as f:
        f.write(file_content)

    file_name = os.path.join('static', file.filename) # Constructing file path, file_name holds the full path to the uploaded file

    input_shape = (96, 96, 3) # Input shape expected by Deep Learning Model. images of size 96x96 pixels with 3 color channels (Red, Green, Blue). The model has been trained to work with this specific input size and format.

    model = tf.keras.models.load_model('best.h5') # Load a pre-trained Keras model from a file, model is a Keras model object.

    image = cv.imread(file_name) # Reads an image from a specified file. image holds the image data as Numpy array

    image = cv.cvtColor(image, cv.COLOR_BGR2RGB) # converts the color space of an image. converts from Blue, Green, Red, to Red, Green, Blue.
    # OpenCV loads images in BGR format by default.

    resized = cv.resize(image, (input_shape[1], input_shape[0])) # resize the image for a new size

    resized = (resized / 255.0).reshape(-1, input_shape[1], input_shape[0], input_shape[2]) # normalization,
    # normalizes the pixel values to the range [0,1]. image data has typically pixel values in range [0,255]
    # normalizing help the model learn more effectively

    preds = model.predict(resized) # making predictions, uses the loaded model to predict the class of the uploaded image.
    preds = np.where(preds < 0.3, 0, 1) # outputs probabilities, these are converted to binary values (0 or 1) 

    # mapping predictions to class labels
    class_list = ['beef', # possible food categories
                     'bowl',
                     'bread',
                     'chicken',
                     'curry',
                     'eels',
                     'fried',
                     'green',
                     'hambarg',
                     'hamburger',
                     'noodle',
                     'pilaf',
                     'potato',
                     'raisin',
                     'rice',
                     'roast',
                     'salad',
                     'sandwiches',
                     'steak',
                     'tempura',
                     'tensin',
                     'udon']
    result = [] # store the predicted labels.

    for i in range(preds.shape[1]):
      if preds[0][i] == 1:
        result.append(class_list[i])

    return render_template('index.html', file_name=file_name, results=result)
  
  return render_template('index.html')

if __name__ == '__main__':
  app.run()