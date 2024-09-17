import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate

const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate

  const { response } = location.state as { response: string }; // Type assertion to extract response

  // Function to handle navigation back to /userPageController
  const handleBackButton = () => {
    navigate("/userPageController");
  };

  return (
    <div className="relative min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center">
      {/* Back button positioned at the top left corner */}
      <button
        type="button"
        className="absolute top-4 left-4 mb-5 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
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

      {/* AI Response Section */}
      <h1 className="text-2xl font-bold mb-5">Nutri Response</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl">
        <p className="text-lg">{response}</p>
      </div>
    </div>
  );
};

export default ResultPage;
