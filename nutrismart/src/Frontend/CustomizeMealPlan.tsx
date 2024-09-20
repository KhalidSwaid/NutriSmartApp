import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addPlan,
  addGoal,
  addFoodType,
  addIllustration,
  saveSelectedGoalsToFirestore,
} from "../Backend/GoalsManager"; // Import functions from GoalsManager.ts
import { processMealPlanContent } from "../Backend/CustomizeMealPlanContentProcessor";
import { sendMessageToOpenAI } from "../Backend/HandleAIMsg";
import { useUserContext } from "./UserContext";

function CustomizeMealPlan() {
  const navigate = useNavigate();
  const { userInfo } = useUserContext();

  const handleBackButton = () => {
    navigate("/userPageController");
  };
  const [loading, setLoading] = useState(false);
  const [successSubmitMessage, setSuccessSubmitMessage] = useState("");
  const [_aiResponse, setAiResponse] = useState("");

  const [activeButtonsSet1, setActiveButtonsSet1] = useState<number[]>([]);
  const [activeButtonsSet2, setActiveButtonsSet2] = useState<number[]>([]);
  const [activeButtonsSet3, setActiveButtonsSet3] = useState<number[]>([]);

  // Variables to store the content of selected buttons
  const [selectedPlan, setSelectedPlan] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string[]>([]);
  const [selectedFoodType, setSelectedFoodType] = useState<string[]>([]);

  // Variable to store illustrations/preferences typed by the user
  const [illustrations, setIllustrations] = useState<string>("");

  // Function to handle button click for Set 1 (Plan)
  const handleButtonClickSet1 = (buttonIndex: number) => {
    const isActive = activeButtonsSet1.includes(buttonIndex);
    const selectedContent = buttonSets[0].buttons[buttonIndex];

    if (isActive) {
      setActiveButtonsSet1((prevActiveButtons) =>
        prevActiveButtons.filter((btnIndex) => btnIndex !== buttonIndex),
      );
      setSelectedPlan((prevSelected) =>
        prevSelected.filter((item) => item !== selectedContent),
      );
    } else {
      setActiveButtonsSet1((prevActiveButtons) => [
        ...prevActiveButtons,
        buttonIndex,
      ]);
      setSelectedPlan((prevSelected) => [...prevSelected, selectedContent]);
      addPlan(selectedContent, userInfo.id); // Call addPlan function
    }
  };

  // Function to handle button click for Set 2 (Goal)
  const handleButtonClickSet2 = (buttonIndex: number) => {
    const isActive = activeButtonsSet2.includes(buttonIndex);
    const selectedContent = buttonSets[1].buttons[buttonIndex];

    if (isActive) {
      setActiveButtonsSet2((prevActiveButtons) =>
        prevActiveButtons.filter((btnIndex) => btnIndex !== buttonIndex),
      );
      setSelectedGoal((prevSelected) =>
        prevSelected.filter((item) => item !== selectedContent),
      );
    } else {
      setActiveButtonsSet2((prevActiveButtons) => [
        ...prevActiveButtons,
        buttonIndex,
      ]);
      setSelectedGoal((prevSelected) => [...prevSelected, selectedContent]);
      addGoal(selectedContent, userInfo.id); // Call addGoal function
    }
  };

  // Function to handle button click for Set 3 (Food Type)
  const handleButtonClickSet3 = (buttonIndex: number) => {
    const isActive = activeButtonsSet3.includes(buttonIndex);
    const selectedContent = buttonSets[2].buttons[buttonIndex];

    if (isActive) {
      setActiveButtonsSet3((prevActiveButtons) =>
        prevActiveButtons.filter((btnIndex) => btnIndex !== buttonIndex),
      );
      setSelectedFoodType((prevSelected) =>
        prevSelected.filter((item) => item !== selectedContent),
      );
    } else {
      setActiveButtonsSet3((prevActiveButtons) => [
        ...prevActiveButtons,
        buttonIndex,
      ]);
      setSelectedFoodType((prevSelected) => [...prevSelected, selectedContent]);
      addFoodType(selectedContent, userInfo.id); // Call addFoodType function
    }
  };

  // Function to handle the illustrations input change
  const handleIllustrationsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setIllustrations(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await addIllustration(illustrations, userInfo.id); // Save illustrations to Firestore
      await saveSelectedGoalsToFirestore(userInfo.id); // Save all data to Firestore

      // Process the meal plan content to generate a message
      const message = processMealPlanContent({
        selectedPlan,
        selectedGoal,
        selectedFoodType,
        illustrations,
      });

      // Send the message to OpenAI and get the response
      const aiReply = await sendMessageToOpenAI(message);
      setAiResponse(aiReply); // Save the AI response
      console.log("AI RESPONSE FROM CUSTOMIZEMEALPLAN:", aiReply);

      setTimeout(() => {
        setLoading(false); // Hide loading spinner
        setSuccessSubmitMessage("Submit Successfully"); // Show success message

        // Log selected values
        console.log("Selected Plan:", selectedPlan);
        console.log("Selected Goal:", selectedGoal);
        console.log("Selected Food Type:", selectedFoodType);
        console.log("User Illustrations/Preferences:", illustrations);

        // After another 2 seconds, navigate to the specified page
        setTimeout(() => {
          setSuccessSubmitMessage(""); // Clear success message (optional)

          // Wait 1 second and then navigate
          setTimeout(() => {
            navigate("/userPageController");
          }, 1000);
        }, 2000);
      }, 2000);
      console.log("Data saved successfully.");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const buttonSets = [
    {
      title: "Choose your plan",
      buttons: ["Weekly Meal Plan", "Monthly Meal Plan"],
    },
    {
      title: "Choose your goal",
      buttons: [
        "Gain weight",
        "Lose weight",
        "Gain fat",
        "Lose fat",
        "Gain muscle mass",
        "Lose muscle mass",
        "Eat Healthy",
      ],
    },

    {
      title: "Choose your food type",
      buttons: [
        "Salty",
        "Sweety",
        "Meat",
        "Vegetables & Fruits",
        "Rice",
        "Pasta",
        // Add more buttons as needed
      ],
    },
  ];

  return (
    <div className="relative bg-zinc-50 text-center text-surface dark:text-black pb-1 w-full">
      <nav className="max-w-screen-xl flex items-center justify-between mx-auto p-5 bg-white relative z-10 mb-5">
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
      {buttonSets.map((buttonSet, setIndex) => (
        <div key={setIndex} className="flex flex-col items-center mb-5">
          <h2 className="text-lg font-semibold mb-2">{buttonSet.title}</h2>
          <div className="flex flex-wrap justify-center space-x-2">
            {buttonSet.buttons.map((condition, buttonIndex) => (
              <button
                key={buttonIndex}
                className={`inline-block h-10 rounded-3xl shadow-lg focus:outline-none mb-2 font-semibold px-2 ${
                  (setIndex === 0 && activeButtonsSet1.includes(buttonIndex)) ||
                  (setIndex === 1 && activeButtonsSet2.includes(buttonIndex)) ||
                  (setIndex === 2 && activeButtonsSet3.includes(buttonIndex))
                    ? "bg-blue-100 text-blue-700"
                    : "bg-blue-200 text-blue-900"
                } hover:bg-blue-100`}
                onClick={() =>
                  setIndex === 0
                    ? handleButtonClickSet1(buttonIndex)
                    : setIndex === 1
                      ? handleButtonClickSet2(buttonIndex)
                      : handleButtonClickSet3(buttonIndex)
                }
              >
                {condition}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="flex items-center justify-center mb-5">
        <div className="flex flex-col justify-center items-center bg-white bg-opacity-80 rounded-md p-4">
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-gray-900 dark:text-black mb-2"
          >
            Add more preferences
          </label>
          <textarea
            id="message"
            rows={4}
            className="w-80 block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
            placeholder="Add more preferences..."
            value={illustrations}
            onChange={handleIllustrationsChange}
          ></textarea>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-3">
        <button
          type="button"
          className="mb-2 w-3/4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={handleSubmit}
        >
          Submit
          {loading && (
            <div
              className="animate-spin inline-block h-5 w-5 border-[3px] border-current border-t-transparent text-white rounded-full ml-2"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </button>
        {successSubmitMessage && (
          <p className="text-green-500 mt-4 text-center">
            {successSubmitMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default CustomizeMealPlan;
