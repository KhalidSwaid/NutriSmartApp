import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function InputGoals() {
  const navigate = useNavigate();

  // States to manage the selected fil, prediction results, and errors
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  // Handle form submission to upload image and get predictions
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file.");
      }

      const data = await response.json(); // Parse the JSON response
      setPredictions(data.predictions); // Update predictions state
      setError(null); // Clear any errors
    } catch (err: any) {
      setError(err.message);
    }
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
        onClick={handleUpload}
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
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl block w-40 p-2.5 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black "
            placeholder="Sugar..."
            required
          />
        </div>
        <button
          type="button"
          className="mb-3 w-3/4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default InputGoals;
