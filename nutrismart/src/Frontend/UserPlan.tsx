// File: UserPlan.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Frontend/UserContext";
import { getCustomizedMealPlan } from "../Backend/ExtractCustomizeMealPlanFromDatabase";

const UserPlan: React.FC = () => {
  const navigate = useNavigate();
  const { userInfo } = useUserContext();
  const [mealPlan, setMealPlan] = useState<{
    planType: string[];
    goal: string[];
    foodType: string[];
    illustrations: string;
    plan: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  // Function to handle back button click
  const handleBackButton = () => {
    navigate("/userPageController");
  };

  // Function to parse the meal plan response into structured content
  const parseMealPlanResponse = (response: string) => {
    // Split the response by line breaks for structured display
    const responseLines = response
      .split("\n")
      .filter((line) => line.trim() !== "");

    return responseLines;
  };

  // Fetch the customized meal plan when the component mounts
  useEffect(() => {
    const fetchMealPlan = async () => {
      const mealPlanData = await getCustomizedMealPlan(userInfo.id);
      setMealPlan(mealPlanData);
      setLoading(false);
    };

    fetchMealPlan();
  }, [userInfo.id]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
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
        {loading ? (
          <p className="text-center text-lg text-gray-700">
            Loading the customized meal plan...
          </p>
        ) : mealPlan ? (
          <>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
              Customized Meal Plan
            </h1>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Plan Type:
              </h2>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                {mealPlan.planType.map((plan, index) => (
                  <li key={index} className="mt-1">
                    {plan}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Goal:</h2>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                {mealPlan.goal.map((goal, index) => (
                  <li key={index} className="mt-1">
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Food Type:
              </h2>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                {mealPlan.foodType.map((food, index) => (
                  <li key={index} className="mt-1">
                    {food}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Illustrations/Preferences:
              </h2>
              <p className="text-gray-700 mt-2">{mealPlan.illustrations}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Meal Plan:
              </h2>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                {parseMealPlanResponse(mealPlan.plan).map((line, index) => (
                  <li key={index} className="mt-1">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p className="text-center text-lg text-gray-700">
            No customized meal plan found for this user.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserPlan;
