// File: CustomizeMealPlanResults.tsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CustomizeMealPlanResults: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the AI response from the location state
  const aiResponse = location.state?.aiResponse || "";

  // Function to handle back button click
  const handleBackButton = () => {
    navigate("/customizeMealPlan");
  };

  // Function to parse and split the AI response
  const parseAiResponse = (response: string) => {
    // Identify the start of the actual meal plan using a keyword
    const startIndex = response
      .toLowerCase()
      .indexOf("here is your personalized");

    // If the keyword is found, strip out the introductory text
    const filteredResponse =
      startIndex !== -1 ? response.substring(startIndex) : response;

    // Split the response by line breaks for structured display
    const responseLines = filteredResponse
      .split("\n")
      .filter((line) => line.trim() !== "");

    return responseLines;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Back Button */}
      <button
        type="button"
        className="absolute top-4 left-4 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
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

      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        {aiResponse ? (
          <>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
              Customized Meal Plan
            </h1>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Meal Plan:
              </h2>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                {parseAiResponse(aiResponse).map((line, index) => (
                  <li key={index} className="mt-1">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p className="text-center text-lg text-gray-700">
            Loading the customized meal plan...
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomizeMealPlanResults;
