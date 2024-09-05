import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InputMedicalConditions() {
  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate("/userPage");
  };

  const [activeButtonsSet1, setActiveButtonsSet1] = useState<number[]>([]);
  const [activeButtonsSet2, setActiveButtonsSet2] = useState<number[]>([]);
  const [activeButtonsSet3, setActiveButtonsSet3] = useState<number[]>([]);

  const handleButtonClickSet1 = (buttonIndex: number) => {
    // Check if the button is already active
    const isActive = activeButtonsSet1.includes(buttonIndex);

    if (isActive) {
      // Remove from active buttons if already active
      setActiveButtonsSet1((prevActiveButtons) =>
        prevActiveButtons.filter((btnIndex) => btnIndex !== buttonIndex),
      );
    } else {
      // Add to active buttons if not active
      setActiveButtonsSet1((prevActiveButtons) => [
        ...prevActiveButtons,
        buttonIndex,
      ]);
    }
  };

  const handleButtonClickSet2 = (buttonIndex: number) => {
    // Check if the button is already active
    const isActive = activeButtonsSet2.includes(buttonIndex);

    if (isActive) {
      // Remove from active buttons if already active
      setActiveButtonsSet2((prevActiveButtons) =>
        prevActiveButtons.filter((btnIndex) => btnIndex !== buttonIndex),
      );
    } else {
      // Add to active buttons if not active
      setActiveButtonsSet2((prevActiveButtons) => [
        ...prevActiveButtons,
        buttonIndex,
      ]);
    }
  };

  const handleButtonClickSet3 = (buttonIndex: number) => {
    // Check if the button is already active
    const isActive = activeButtonsSet3.includes(buttonIndex);

    if (isActive) {
      // Remove from active buttons if already active
      setActiveButtonsSet3((prevActiveButtons) =>
        prevActiveButtons.filter((btnIndex) => btnIndex !== buttonIndex),
      );
    } else {
      // Add to active buttons if not active
      setActiveButtonsSet3((prevActiveButtons) => [
        ...prevActiveButtons,
        buttonIndex,
      ]);
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
        "Lost weight",
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
    <div className="relative bg-zinc-50  text-center text-surface dark:text-black pb-1 w-full">
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

      <div className=" flex items-center justify-center">
        <div className="flex flex-col justify-center items-center bg-white bg-opacity-80 rounded-md">
          <label
            htmlFor="message"
            className="block  text-sm font-semibold text-gray-900 dark:text-black"
          >
            Add more preferences
          </label>
          <textarea
            id="message"
            rows={4}
            className="w-80 block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
            placeholder="Add more preferences..."
          ></textarea>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-5">
        <button
          type="button"
          className="mb-3 w-3/4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Create recipe
        </button>
      </div>
    </div>
  );
}

export default InputMedicalConditions;
