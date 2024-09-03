// import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InputGoals() {
  // State to manage the visibility of the navbar
  // const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  // // const [activeButton, setActiveButton] = useState("search");
  // const [isOpenedHamMenu, setIsOpenedHamMenu] = useState(false);

  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate("/userPage");
  };

  // Function to toggle the navbar visibility
  // const toggleNavbar = () => {
  //   setIsNavbarVisible(!isNavbarVisible);
  //   setIsOpenedHamMenu(!isOpenedHamMenu);
  // };

  // const handleButtonClick = (button: string) => {
  //   setActiveButton(button);
  // };

  return (
    <div className="relative bg-zinc-50  text-center text-surface dark:text-black pb-1 w-full">
      <nav className="max-w-screen-xl flex items-center justify-between mx-auto p-3 bg-white relative z-10">
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

      <div className="relative px-8 py-3 mb-1">
        <img
          src="../public/vegetables.jpg"
          alt=""
          className="block w-full h-auto rounded-md blur-sm"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <button className=" text-black py-2 px-4 rounded-md">
            <img
              src="../public/insertimage.jpg"
              alt=""
              className="rounded w-20"
            />
            Insert Image
          </button>
        </div>
      </div>

      <div className="flex flex-col  justify-center items-center">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-semibold text-gray-900 dark:text-black "
        >
          Type in your illustrations
        </label>
        <textarea
          id="message"
          rows={3}
          className="w-3/4 block p-2.5  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
          placeholder="Write your illustrations here..."
        ></textarea>
      </div>

      <div className="flex flex-col items-center justify-center py-5">
        <div className="flex w-44 items-center justify-center gap-1 mb-4">
          <div className="w-1/2 text-black font-semibold bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300  rounded-full text-sm px-5 py-2.5 me-2 dark:bg-gray-300  dark:focus:ring-gray-700 dark:border-gray-700">
            Calories
          </div>
          <label
            htmlFor="text"
            className="block mb-2 test-sm font-medium text-gray-900 dark:text-black"
          ></label>
          <input
            type="text"
            id="calories"
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Calories..."
            required
          />
        </div>
        <div className="flex w-44 items-center justify-center gap-1 mb-4">
          <div className="w-1/2 text-black font-semibold bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300  rounded-full text-sm px-5 py-2.5 me-2 dark:bg-gray-300  dark:focus:ring-gray-700 dark:border-gray-700">
            Protein
          </div>
          <label
            htmlFor="text"
            className="block mb-2 test-sm font-medium text-gray-900 dark:text-black"
          ></label>
          <input
            type="text"
            id="calories"
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Protein..."
            required
          />
        </div>
        <div className="flex w-44 items-center justify-center gap-1 mb-4">
          <div className="w-1/2 text-black font-semibold bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300  rounded-full text-sm px-6 py-2.5 me-2 dark:bg-gray-300  dark:focus:ring-gray-700 dark:border-gray-700">
            Carbs
          </div>
          <label
            htmlFor="text"
            className="block mb-2 test-sm font-medium text-gray-900 dark:text-black"
          ></label>
          <input
            type="text"
            id="calories"
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Carbs..."
            required
          />
        </div>
        <div className="flex w-44 items-center justify-center gap-1 mb-4">
          <div className="w-1/2 text-black font-semibold bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300  rounded-full text-sm px-6 py-2.5 me-2 dark:bg-gray-300  dark:focus:ring-gray-700 dark:border-gray-700">
            Sugar
          </div>
          <label
            htmlFor="text"
            className="block mb-2 test-sm font-medium text-gray-900 dark:text-black"
          ></label>
          <input
            type="text"
            id="calories"
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl block w-40 p-2.5 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black "
            placeholder="Sugar..."
            required
          />
        </div>
        <button
          type="button"
          className="mb-3 w-3/4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default InputGoals;
