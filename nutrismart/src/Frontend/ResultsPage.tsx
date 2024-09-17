import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate

const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate

  const { response } = location.state as { response: string }; // Type assertion to extract response

  const [rating, setRating] = useState<number | null>(null); // State for storing the selected rating
  const [hover, setHover] = useState<number | null>(null); // State for managing hover effect

  // Function to handle navigation back to /userPageController
  const handleBackButton = () => {
    navigate("/userPageController");
  };

  // Function to handle heart rating click
  const handleRating = (rate: number) => {
    setRating(rate);
    console.log(`Rated ${rate} hearts`);
  };

  return (
    <div className="relative min-h-screen bg-gray-100 p-4 flex flex-col items-start justify-start">
      {/* Back button positioned at the top left corner */}
      <button
        type="button"
        className="mb-5 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
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
      <div className="flex flex-col items-center w-full">
        <h1 className="text-2xl font-bold mb-5">Nutri Response</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
          {/* Scrollable Response Container */}
          <div className="max-h-64 overflow-y-scroll p-2 mb-4 border border-gray-300 rounded">
            <p className="text-lg">{response}</p>
          </div>

          {/* Heart Rating Section */}
          <div className="flex justify-center mt-4">
            {[1, 2, 3, 4, 5].map((heart) => (
              <button
                key={heart}
                type="button"
                onClick={() => handleRating(heart)}
                onMouseEnter={() => setHover(heart)}
                onMouseLeave={() => setHover(null)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={
                    (hover ?? 0) >= heart || (rating ?? 0) >= heart
                      ? "red"
                      : "none"
                  }
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.049 2.927c.3-1.184 1.912-1.184 2.212 0l.94 3.705a1 1 0 00.95.69h3.905c1.258 0 1.784 1.62.9 2.35l-2.984 2.442a1 1 0 00-.364 1.118l1.34 3.794c.424 1.199-.968 2.19-1.83 1.386l-3.117-2.855a1 1 0 00-1.285 0l-3.117 2.855c-.862.804-2.254-.187-1.83-1.386l1.34-3.794a1 1 0 00-.364-1.118L2.743 9.672c-.884-.73-.358-2.35.9-2.35h3.905a1 1 0 00.95-.69l.94-3.705z"
                  />
                </svg>
              </button>
            ))}
          </div>
          {rating && (
            <p className="mt-2 text-sm text-gray-600">Rated {rating} Stars!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
