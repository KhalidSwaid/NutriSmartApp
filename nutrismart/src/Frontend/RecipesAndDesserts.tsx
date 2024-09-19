import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  sendMessageToOpenAI,
  getRandomReason,
} from "../Backend/GenerateRecipesAndDesserts"; // Import functions from the TypeScript file
import {
  SaveRecipesToDatabase,
  updateRecipeRating,
} from "../Backend/SaveRecipesAndDessertsToDatabase";

const RecipesAndDesserts: React.FC = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<{ reason: string; content: string }[]>(
    [],
  ); // State for storing recipes
  const [ratings, setRatings] = useState<number[]>([]); // State for storing ratings

  // Function to fetch a recipe and add it to the state
  const fetchRecipe = async () => {
    const reason = getRandomReason(); // Get a random reason for generating a recipe
    const content = await sendMessageToOpenAI(reason); // Fetch the recipe using OpenAI API
    setRecipes((prevRecipes) => [...prevRecipes, { reason, content }]); // Add the new recipe to the state
    setRatings((prevRatings) => [...prevRatings, 0]); // Initialize rating for the new recipe

    SaveRecipesToDatabase(reason, content);
  };

  // Fetch a recipe when the component mounts
  useEffect(() => {
    fetchRecipe();
  }, []);

  // Function to handle rating click
  const handleRating = async (index: number, rating: number) => {
    const newRatings = [...ratings];
    newRatings[index] = rating; // Update the rating for the specific recipe
    setRatings(newRatings);

    // Update the rating in Firestore
    const recipe = recipes[index];
    await updateRecipeRating(recipe.reason, rating);
  };

  const handleBackButton = () => {
    navigate("/userPageController");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex items-center justify-between mb-6">
        {/* Back Button on the Left */}
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

        {/* Header in the Center */}
        <h1 className="flex-grow text-3xl font-bold text-center">
          Recipes and Desserts
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {recipe.reason}
            </h2>
            <p className="text-gray-700 mb-4">{recipe.content}</p>

            {/* Star Rating Section */}
            <div className="flex justify-center mt-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRating(index, star)}
                  onMouseEnter={() => {}}
                  onMouseLeave={() => {}}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={ratings[index] >= star ? "gold" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 text-yellow-500"
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

            {ratings[index] > 0 && (
              <p className="mt-2 text-sm text-gray-600 text-center">
                Rated {ratings[index]} stars!
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Button to Fetch More Recipes */}
      <div className="flex justify-center mt-8">
        <button
          type="button"
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-500"
          onClick={fetchRecipe}
        >
          Generate More Recipes
        </button>
      </div>
    </div>
  );
};

export default RecipesAndDesserts;
