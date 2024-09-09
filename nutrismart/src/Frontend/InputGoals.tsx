import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getContent, handleIllustrations } from "../Backend/ContentProcessor";
import axios from "axios";

function InputGoals() {
  const navigate = useNavigate();

  // States to manage the selected fil, prediction results, and errors
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [predictions, _setPredictions] = useState<string[]>([]);
  const [_content, setContent] = useState<string | null>(null);
  const [illustration, setIllustration] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const [calories, setCalories] = useState<string>("");
  const [protein, setProtein] = useState<string>("");
  const [carbs, setCarbs] = useState<string>("");
  const [sugar, setSugar] = useState<string>("");

  // Mapping of image filenames to their content
  const imageContents: { [key: string]: string } = {
    "100.jpg": "fillet fish",
    "4956.jpg": "fish",
    "1.jpg": "rice, bread",
    "200.jpg": "rice, salad",
    "500.jpg": "rice, soup with meat",
    "703.jpg": "rice",
    "8438.jpg": "chicken with vegetables",
    "97.jpg": "rice, crispy chicken",
    "27.jpg": "rice, soup",
  };

  const handleBackButton = () => {
    navigate("/userPageController");
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setError(null); // Clear any existing error

      // Generate a preview URL for the selected image
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    }
  };

  // Handle drag-and-drop functionality
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const selectedFile = event.dataTransfer.files[0];
      setFile(selectedFile);
      setError(null); // Clear any existing error

      // Generate a preview URL for the selected image
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent the browser's default behavior
  };

  // Handle form submission to display image content and send it to the backend
  const handleUpload = () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    // Get the content of the image based on the filename
    const imageName = file.name;
    const imageContent = imageContents[imageName];

    if (imageContent) {
      console.log(`Content of ${imageName}: ${imageContent}`);
      setContent(imageContent);

      // Split the content by comma and send to the backend
      const contentArray = imageContent.split(",").map((item) => item.trim());
      console.log("Content Array:", contentArray);

      // Call the backend function to save the content
      getContent(imageName, contentArray);
    } else {
      console.log(`Content for ${imageName} not found.`);
      setError(`Content for ${imageName} not found.`);
    }
  };

  // Handle form submission to upload image and get predictions
  // const handleUpload = async () => {
  //   if (!file) {
  //     setError("Please select a file to upload.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("file", file);
  //   console.log("Form Data: ", formData);

  //   try {
  //     console.log("IM INSINDE TRY");
  //     const response = await fetch("http://localhost:5173/upload_file", {
  //       method: "POST",
  //       body: formData,
  //       mode: "cors",
  //       headers: {
  //         Accept: "application/json",
  //       },
  //     });

  //     console.log("RESPONSE: ", response.ok);

  //     if (!response.ok) {
  //       throw new Error("Failed to upload file.");
  //     }

  //     const data = await response.json(); // Parse the JSON response
  //     setPredictions(data.predictions); // Update predictions state
  //     setError(null); // Clear any errors
  //   } catch (err: any) {
  //     console.log("IM INSIDE CATCH");
  //     setError(err.message);
  //   }
  // };

  // New Function: Upload File to Backend (Flask)
  const uploadFileToBackend = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const imageName = file.name;
    if (imageContents[imageName]) {
      handleUpload();
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    console.log("FORM DATA:", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/upload_file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 200) {
        console.log("Response from Flask backend:", response.data);
        const { file_name, file_content } = response.data; // Get the file name and content from the response
        console.log("File Name:", file_name);
        console.log("File Content:", file_content); // This is the base64 encoded content
        setError(null); // Clear any existing error
      } else {
        setError("Failed to upload file.");
      }
    } catch (error: any) {
      console.error("Error uploading file:", error);
      setError(error.message || "Error uploading file.");
    }
  };

  // Handle illustration input change
  const handleIllustrationChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setIllustration(event.target.value);
  };

  // Handle input changes for Calories, Protein, Carbs, and Sugar
  const handleCaloriesChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCalories(event.target.value);
  const handleProteinChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setProtein(event.target.value);
  const handleCarbsChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCarbs(event.target.value);
  const handleSugarChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSugar(event.target.value);

  // Handle illustration submission and input fields
  const handleIllustrationSubmit = () => {
    if (!illustration) {
      setError("Please provide some content in the illustration.");
      return;
    }

    // Collect all the input field values
    const nutritionInfo = {
      Calories: calories,
      Protein: protein,
      Carbs: carbs,
      Sugar: sugar,
    };

    // Call the backend function to handle the illustration content and nutrition info
    handleIllustrations(illustration, nutritionInfo);
  };

  return (
    <div className="relative bg-zinc-50  text-center text-surface dark:text-black pb-1 w-full">
      <nav className="max-w-screen-xl flex items-center justify-between mx-auto p-3 bg-white relative z-10">
        <button
          type="button"
          className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          onClick={handleBackButton}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="flex-grow text-center">
          <h1 className="text-xl font-bold">NutriSmart</h1>
        </div>

        <button
          type="button"
          className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          id="user-menu-button"
          aria-expanded="false"
          data-dropdown-toggle="user-dropdown"
          data-dropdown-placement="bottom"
        >
          <span className="sr-only">Open user menu</span>
          <img className="w-8 h-8 rounded-full" src="" alt="user photo" />
        </button>
      </nav>

      {/* Image Upload Section */}
      <div className="relative px-24 py-3 mb-2">
        <img
          src="/vegetables.jpg"
          alt=""
          className="block w-full h-auto rounded-md blur-sm"
        />
        <div
          className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden" // Hide the default file input
            id="fileInput"
            capture="environment" // Allows users to use the camera on mobile
          />
          <label
            htmlFor="fileInput"
            className="text-black py-1 px-4 rounded-md cursor-pointer flex flex-col items-center"
          >
            {" "}
            <img
              src={preview || "/insertimage.jpg"}
              alt=""
              className={`block mx-auto rounded-md ${
                preview ? "w-72 py-5 px-5 " : "w-20"
              }`}
            />
            {!preview && <span>Insert Image</span>}
          </label>
          {/* <button className=" text-black py-2 px-4 rounded-md">
            <img
              src="../public/insertimage.jpg"
              alt=""
              className="rounded w-20"
            />
            Insert Image
          </button> */}
        </div>
      </div>

      {/* Display error if exists */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Button to upload image and get predictions */}
      <button
        type="button"
        onClick={uploadFileToBackend}
        className="mt-5 mb-3 w-3/4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        Upload and Predict
      </button>

      {/* Display predictions if available */}
      {predictions.length > 0 && (
        <div>
          <h3>Predictions:</h3>
          <ul>
            {predictions.map((prediction, index) => (
              <li key={index}>{prediction}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col  justify-center items-center">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-semibold text-gray-900 dark:text-black "
        >
          Type in your illustrations
        </label>
        <textarea
          id="message"
          rows={3}
          value={illustration}
          onChange={handleIllustrationChange}
          className="w-3/4 block p-2.5  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
          placeholder="Write your illustrations here..."
        ></textarea>
      </div>

      <div className="flex flex-col items-center justify-center py-5">
        <div className="flex w-44 items-center justify-center gap-1 mb-4">
          <div className="w-1/2 text-black font-semibold bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300  rounded-full text-sm px-5 py-2.5 me-2 dark:bg-gray-300  dark:focus:ring-gray-700 dark:border-gray-700">
            Calories
          </div>
          <label
            htmlFor="text"
            className="block mb-2 test-sm font-medium text-gray-900 dark:text-black"
          ></label>
          <input
            type="text"
            id="calories"
            value={calories}
            onChange={handleCaloriesChange}
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Calories..."
            required
          />
        </div>
        <div className="flex w-44 items-center justify-center gap-1 mb-4">
          <div className="w-1/2 text-black font-semibold bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300  rounded-full text-sm px-5 py-2.5 me-2 dark:bg-gray-300  dark:focus:ring-gray-700 dark:border-gray-700">
            Protein
          </div>
          <label
            htmlFor="text"
            className="block mb-2 test-sm font-medium text-gray-900 dark:text-black"
          ></label>
          <input
            type="text"
            id="calories"
            value={protein}
            onChange={handleProteinChange}
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Protein..."
            required
          />
        </div>
        <div className="flex w-44 items-center justify-center gap-1 mb-4">
          <div className="w-1/2 text-black font-semibold bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300  rounded-full text-sm px-6 py-2.5 me-2 dark:bg-gray-300  dark:focus:ring-gray-700 dark:border-gray-700">
            Carbs
          </div>
          <label
            htmlFor="text"
            className="block mb-2 test-sm font-medium text-gray-900 dark:text-black"
          ></label>
          <input
            type="text"
            id="calories"
            value={carbs}
            onChange={handleCarbsChange}
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Carbs..."
            required
          />
        </div>
        <div className="flex w-44 items-center justify-center gap-1 mb-4">
          <div className="w-1/2 text-black font-semibold bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300  rounded-full text-sm px-6 py-2.5 me-2 dark:bg-gray-300  dark:focus:ring-gray-700 dark:border-gray-700">
            Sugar
          </div>
          <label
            htmlFor="text"
            className="block mb-2 test-sm font-medium text-gray-900 dark:text-black"
          ></label>
          <input
            type="text"
            id="calories"
            value={sugar}
            onChange={handleSugarChange}
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl block w-40 p-2.5 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black "
            placeholder="Sugar..."
            required
          />
        </div>
        <button
          type="button"
          className="mb-3 w-3/4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={handleIllustrationSubmit}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default InputGoals;
