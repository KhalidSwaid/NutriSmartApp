import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDessertOfTheMonth } from "../Backend/ExtractDessertOfTheMonthFromDatabase"; // Adjust the path based on your folder structure

interface Dessert {
  name: string;
  content: string;
  rate: number;
}

const BestDessertOfTheMonth: React.FC = () => {
  const navigate = useNavigate();
  const [dessert, setDessert] = useState<Dessert | null>(null);

  // Function to handle back button click
  const handleBackButton = () => {
    navigate("/userPageController");
  };

  // Function to parse and split the recipe content into sections
  const parseDessertContent = (content: string) => {
    // Regular expressions to identify sections
    const ingredientsRegex = /Ingredients:\s*(.+?)(?=Instructions|$)/is;
    const instructionsRegex = /Instructions:\s*(.+?)(?=(Nutrition|$))/is;
    const nutritionRegex =
      /Calories:\s?~?(\d+)\s?kcal.*?Protein:\s?~?(\d+)\s?g.*?Carbohydrates:\s?~?(\d+)\s?g.*?Fat:\s?~?(\d+)\s?g/;

    // Extract ingredients
    const ingredientsMatch = content.match(ingredientsRegex);
    const ingredientsPart = ingredientsMatch
      ? ingredientsMatch[1].trim()
      : "Not provided";

    // Extract instructions
    const instructionsMatch = content.match(instructionsRegex);
    const instructionsPart = instructionsMatch
      ? instructionsMatch[1].trim()
      : "Not provided";
    const instructionsSteps = instructionsPart
      .split(/(\d+\.\s)/)
      .filter((step) => step.trim() !== "");

    // Extract nutritional info
    const nutritionMatch = content.match(nutritionRegex);
    const nutritionalInfo = nutritionMatch
      ? {
          calories: nutritionMatch[1],
          protein: nutritionMatch[2],
          carbs: nutritionMatch[3],
          fat: nutritionMatch[4],
        }
      : {
          calories: "Not provided",
          protein: "Not provided",
          carbs: "Not provided",
          fat: "Not provided",
        };

    return { ingredientsPart, instructionsSteps, nutritionalInfo };
  };

  // Fetch the dessert of the month when the component mounts
  useEffect(() => {
    const fetchDessert = async () => {
      const dessertData = await getDessertOfTheMonth();
      setDessert(dessertData);
    };

    fetchDessert();
  }, []);

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
        {dessert ? (
          <>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
              Dessert of the Month: {dessert.name}
            </h1>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Ingredients:
              </h2>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                {parseDessertContent(dessert.content)
                  .ingredientsPart.split("\n")
                  .map((ingredient, index) => (
                    <li key={index}>{ingredient.trim()}</li>
                  ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Instructions:
              </h2>
              <ol className="list-decimal list-inside text-gray-700 mt-2">
                {parseDessertContent(dessert.content).instructionsSteps.map(
                  (step, index) => (
                    <li key={index}>{step}</li>
                  ),
                )}
              </ol>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Nutritional Information:
              </h2>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>
                  Calories:{" "}
                  {
                    parseDessertContent(dessert.content).nutritionalInfo
                      .calories
                  }{" "}
                  kcal
                </li>
                <li>
                  Protein:{" "}
                  {parseDessertContent(dessert.content).nutritionalInfo.protein}{" "}
                  g
                </li>
                <li>
                  Carbohydrates:{" "}
                  {parseDessertContent(dessert.content).nutritionalInfo.carbs} g
                </li>
                <li>
                  Fat:{" "}
                  {parseDessertContent(dessert.content).nutritionalInfo.fat} g
                </li>
              </ul>
            </div>
            <p className="text-xl font-semibold text-gray-800 text-center mt-6">
              Rating: {dessert.rate} / 5
            </p>
          </>
        ) : (
          <p className="text-center text-lg text-gray-700">
            Loading the best dessert of the month...
          </p>
        )}
      </div>
    </div>
  );
};

export default BestDessertOfTheMonth;
