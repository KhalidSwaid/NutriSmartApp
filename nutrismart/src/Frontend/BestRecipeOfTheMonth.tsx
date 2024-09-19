import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecipeOfTheMonth } from "../Backend/ExtractRecipeOfTheMonthFromDatabase"; // Adjust the path based on your folder structure

interface Recipe {
  name: string;
  content: string;
  rate: number;
}

const BestRecipeOfTheMonth: React.FC = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  // Function to handle back button click
  const handleBackButton = () => {
    navigate("/userPageController");
  };

  // Function to parse and split the recipe content
  const parseRecipeContent = (content: string) => {
    // Refined regex to match various spacing and line breaks
    const nutritionRegex =
      /Calories:\s?~?(\d+)\s?kcal.*?Protein:\s?~?(\d+)\s?g.*?Carbohydrates:\s?~?(\d+)\s?g.*?Fat:\s?~?(\d+)\s?g/;
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

    // Remove nutritional info from content to avoid duplication
    const contentWithoutNutrition = content.replace(nutritionRegex, "");

    // Now split the remaining content into ingredients and instructions
    const [ingredientsPart, instructionsPart] =
      contentWithoutNutrition.split("Cook the");

    const instructionsSteps = instructionsPart
      ? instructionsPart.split(". ").map((step) => step.trim())
      : [];

    return { ingredientsPart, instructionsSteps, nutritionalInfo };
  };

  // Fetch the recipe of the month when the component mounts
  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeData = await getRecipeOfTheMonth();
      setRecipe(recipeData);
    };

    fetchRecipe();
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
        {recipe ? (
          <>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
              Recipe of the Month: {recipe.name}
            </h1>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Ingredients:
              </h2>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                {parseRecipeContent(recipe.content)
                  .ingredientsPart.split(",")
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
                {parseRecipeContent(recipe.content).instructionsSteps.map(
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
                  {parseRecipeContent(recipe.content).nutritionalInfo.calories}{" "}
                  kcal
                </li>
                <li>
                  Protein:{" "}
                  {parseRecipeContent(recipe.content).nutritionalInfo.protein} g
                </li>
                <li>
                  Carbohydrates:{" "}
                  {parseRecipeContent(recipe.content).nutritionalInfo.carbs} g
                </li>
                <li>
                  Fat: {parseRecipeContent(recipe.content).nutritionalInfo.fat}{" "}
                  g
                </li>
              </ul>
            </div>
            <p className="text-xl font-semibold text-gray-800 text-center mt-6">
              Rating: {recipe.rate} / 5
            </p>
          </>
        ) : (
          <p className="text-center text-lg text-gray-700">
            Loading the best recipe of the month...
          </p>
        )}
      </div>
    </div>
  );
};

export default BestRecipeOfTheMonth;
