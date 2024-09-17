import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { FaStar } from "react-icons/fa"; // Import star icons from react-icons

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

  // Function to handle star rating click
  const handleRating = (rate: number) => {
    setRating(rate);
    console.log(`Rated ${rate} stars`);
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

          {/* Star Rating Section */}
          <div className="flex justify-center mt-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
              >
                <FaStar
                  size={30} // Correct way to pass size
                  color={
                    (hover ?? 0) >= star || (rating ?? 0) >= star
                      ? "yellow"
                      : "gray"
                  } // Use color prop instead of className
                />
              </button>
            ))}
          </div>
          {rating && (
            <p className="mt-2 text-sm text-gray-600">Rated {rating} stars!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
