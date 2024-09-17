import { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";
import {
  checkUserOnlineStatus,
  setUserOnlineStatus,
  resetUserOnlineStatus,
} from "../Backend/CheckOnlineUser";

function UserPage() {
  const navigate = useNavigate();
  const { userInfo } = useUserContext();
  const hasAlertShown = useRef(false);

  // Check if the user is online, show an alert if not, and update status to online
  useEffect(() => {
    const checkAndAlert = async () => {
      console.log("USER INFO:", userInfo);
      try {
        const isOnline = await checkUserOnlineStatus(userInfo.id); // Check if the user is online
        console.log("isOnline:", isOnline);

        if (!isOnline && !hasAlertShown.current) {
          // Show alert only if the user is not online
          const userName = userInfo.email.split("@")[0];
          console.log(userInfo.email);
          alert(`Hello ${userName}`); // Show the alert
          hasAlertShown.current = true; // Mark alert as shown

          console.log("User INFO:", userInfo);

          // Update the user's online status to true
          await setUserOnlineStatus(userInfo.id);
          console.log(`User ${userInfo.id} is now set to online.`);
        }
      } catch (error) {
        console.error("Error checking or updating online status:", error);
      }
    };

    checkAndAlert(); // Call the async function
  }, [userInfo.id, userInfo.email]);

  // useEffect(() => {
  //   if (!hasAlertShown.current) {
  //     const userName = userInfo.email.split("@")[0];
  //     alert(`Hello ${userName}`);
  //     hasAlertShown.current = true;
  //   }
  // }, [userInfo.email]);

  // Show an alert only when userCount is 1 and reset the count afterward

  const handleHomeButton = async () => {
    try {
      // Reset the user's online status
      await resetUserOnlineStatus(userInfo.id);
      console.log(`User ${userInfo.id} is now offline.`);

      // Navigate to the home page
      navigate("/");
    } catch (error) {
      console.error("Error resetting user online status:", error);
    }
  };

  const handleInsertImageButton = () => {
    navigate("/inputGoals");
  };

  const handleInputMedicalConditionsButton = () => {
    navigate("/inputMedicalConditions");
  };

  const handleCustomizeMealPlanButton = () => {
    navigate("/customizeMealPlan");
  };

  const handleNutritionistChatButton = () => {
    navigate("/nutritionistPage");
  };

  // State to manage the visibility of the navbar
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [activeButton, setActiveButton] = useState("search");
  const [isOpenedHamMenu, setIsOpenedHamMenu] = useState(false);

  // Function to toggle the navbar visibility
  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
    setIsOpenedHamMenu(!isOpenedHamMenu);
  };

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };

  const handleCombinedButtonClick = () => {
    handleButtonClick("insert");
    handleInsertImageButton();
  };

  return (
    <div className="relative bg-zinc-50  text-center text-surface dark:text-black">
      <nav className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3 bg-white relative z-10">
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-600 z-50"
          aria-controls="navbar-default"
          aria-expanded={isNavbarVisible ? "true" : "false"}
          onClick={toggleNavbar} // Add onClick event handler
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8M4 18h16"
            />
          </svg>
        </button>
        <div
          className={`fixed inset-x-0 bottom-0 md:hidden bg-white bg-opacity-20 border-opacity-30 z-40 border border-gray-200 ${
            isNavbarVisible ? "translate-y-0" : "translate-y-full"
          } transition-transform duration-300 ease-in-out`}
          id="navbar-default"
        >
          <div className="flex flex-col justify-center items-center min-h-screen pt-20">
            <ul className="px-2 w-11/12 font-medium flex flex-col p-6 md:p-4 mt-4 rounded-lg bg-white bg-opacity-20 backdrop-blur-md md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-white md:dark:bg-gray-900 dark:border-gray-700">
              <li className="w-full md:w-1/4 h-16 border border-gray-200 rounded-md mb-2 md:mb-0 flex justify-center items-center shadow-md">
                <button
                  type="button"
                  className="flex items-center p-2 rounded md:bg-transparent md:p-0 dark:text-black"
                  aria-current="page"
                  onClick={handleInputMedicalConditionsButton}
                >
                  <img
                    src="/medical.jpg"
                    alt=""
                    className="w-8 h-8 mr-2 rounded-md stroke-1"
                  />
                  <span className="ml-2 font-semibold">
                    Input Medical Conditions
                  </span>
                </button>
              </li>
              <li className="w-full md:w-1/4 h-16 border border-gray-200 rounded-md mb-2 md:mb-0 flex justify-center items-center shadow-md">
                <button
                  type="button"
                  className="flex items-center p-2 rounded md:bg-transparent md:p-0 dark:text-black"
                  aria-current="page"
                  onClick={handleCustomizeMealPlanButton}
                >
                  <img
                    src="/customize.jpg"
                    alt=""
                    className="w-8 h-8 mr-2 rounded-md stroke-1"
                  />
                  <span className="ml-2 font-semibold">
                    Customize meal plan
                  </span>
                </button>
              </li>

              <li className="w-full md:w-1/4 h-16 border border-gray-200 rounded-md mb-2 md:mb-0 flex justify-center items-center shadow-md">
                <button
                  type="button"
                  className="flex items-center p-2 rounded md:bg-transparent md:p-0 dark:text-black"
                  aria-current="page"
                  onClick={handleNutritionistChatButton}
                >
                  <img
                    src="/nutritionist.jpg"
                    alt=""
                    className="w-8 h-8 mr-2 rounded-md stroke-1"
                  />
                  <span className="ml-2 font-semibold">Ask nutritionist</span>
                </button>
              </li>

              <li className="w-full md:w-1/4 h-16 border border-gray-200 rounded-md mb-2 md:mb-0 shadow-md">
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Dark/Light mode
                </a>
              </li>
              <li className="w-full md:w-1/4 h-16 border border-gray-200 border-opacity-30 rounded-md mb-2 md:mb-0 flex justify-center items-center shadow-md bg-white bg-opacity-20 backdrop-blur-md">
                <button
                  type="button"
                  className="flex items-center p-2 rounded md:bg-transparent md:p-0 dark:text-black"
                  aria-current="page"
                  onClick={handleHomeButton}
                >
                  <img
                    src="/logout.jpg"
                    alt=""
                    className="w-8 h-8 mr-2 rounded-md stroke-1"
                  />
                  <span className="ml-2 font-semibold">Logout</span>
                </button>
              </li>
              <div className="h-20"></div>
            </ul>
          </div>
        </div>

        <div className="justify-center items-center text-xl font-bold">
          <h1>NutriSmart</h1>
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

      <div className="flex justify-center mt-8 space-x-4 mb-5">
        <button
          className={`py-1.5 px-3 rounded-full focus:outline-none ${
            activeButton === "search"
              ? "bg-black text-white"
              : "bg-zinc-400 text-black dark:bg-zinc-200 dark:text-black"
          }`}
          onClick={() => handleButtonClick("search")}
        >
          Search recipe
        </button>
        <button
          className={`py-1.5 px-3 rounded-full focus:outline-none ${
            activeButton === "insert"
              ? "bg-black text-white border border-gray-200"
              : "bg-zinc-400 text-black dark:bg-zinc-200 dark:text-black"
          }`}
          onClick={() => handleCombinedButtonClick()}
        >
          Insert Image
        </button>
      </div>

      <div className="relative max-w-xl mx-auto mt-15 flex justify-between gap-2 px-6">
        <div className="w-7/12 rounded overflow-hidden shadow-lg relative">
          <img
            src="/chicken-salad.jpg"
            alt="Chicken Salad image with description"
            className=" rounded-xl w-full h-40"
          />
          <div className="absolute inset-0  opacity-60 rounded-xl"></div>
          <div className="absolute inset-0 flex items-top justify-start">
            <h2
              className="text-white text-2xl font-bold ml-2 mt-2"
              //it's just a shadow for the text on the image, i felt it look like drawing and not real!
              style={{
                textShadow:
                  "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
              }}
            >
              Best recipe <br />
              of the <br /> month
            </h2>
          </div>
          <div className="flex flex-col items-start">
            <div className="font-bold text-sm  mt-1">Chicken Salad</div>
            <p className="text-gray-400 text-xs mb-1">
              vegies,low cal,gluten free
            </p>
          </div>
        </div>

        <div className="w-7/12 rounded overflow-hidden shadow-lg relative">
          <img
            src="/pancake.jpg"
            alt="Chicken Salad image with description"
            className=" rounded-xl w-full h-40"
          />
          <div className="absolute inset-0  opacity-60 rounded-xl"></div>
          <div className="absolute inset-0 flex items-top justify-start">
            <h2
              className="text-white text-2xl font-bold ml-2 mt-2"
              //I'ts just a shadow to the text, i felt it look drawing and not real!
              style={{
                textShadow:
                  "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
              }}
            >
              Best dessert <br />
              of the <br /> month
            </h2>
          </div>
          <div className="flex flex-col items-start">
            <div className="font-bold text-sm  mt-1">Pancake</div>
            <p className="text-gray-400 text-xs mb-1">
              High protiein,lower salt
            </p>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default UserPage;
