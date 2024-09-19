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
            <p className="text-lg text-gray-700 mb-6">{recipe.content}</p>
            <p className="text-xl font-semibold text-gray-800 text-center">
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
