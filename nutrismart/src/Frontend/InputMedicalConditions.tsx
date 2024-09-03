import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InputMedicalConditions() {
  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate("/userPage");
  };

  const [activeButton, setActiveButton] = useState<number | null>(null);
  const handleButtonClick = (index: number) => {
    setActiveButton((prevActiveButton) =>
      prevActiveButton === index ? null : index,
    );
  };

  return (
    <div className="relative bg-zinc-50  text-center text-surface dark:text-black pb-1 w-full">
      <nav className="max-w-screen-xl flex items-center justify-between mx-auto p-5 bg-white relative z-10 mb-10">
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

      {/* <div className="flex flex-wrap justify-center space-x-2 mb-3">
        <button className="inline-block h-10 bg-blue-200 rounded-3xl shadow-lg hover:bg-blue-100 focus:outline-none mb-8 text-blue-900 font-semibold px-2">
          Obesity
        </button>
        <button className="inline-block h-10 bg-blue-200 rounded-3xl shadow-lg hover:bg-blue-100 focus:outline-none mb-8 text-blue-900 font-semibold px-2">
          Cardiovascular disease
        </button>
        <button className="inline-block h-10 bg-blue-200 rounded-3xl shadow-lg hover:bg-blue-100 focus:outline-none mb-8 text-blue-900 font-semibold px-2">
          Hypertension
        </button>
        <button className="inline-block h-10 bg-blue-200 rounded-3xl shadow-lg hover:bg-blue-100 focus:outline-none mb-8 text-blue-900 font-semibold px-2">
          Stroke
        </button>
        <button className="inline-block h-10 bg-blue-200 rounded-3xl shadow-lg hover:bg-blue-100 focus:outline-none mb-8 text-blue-900 font-semibold px-2">
          Type 2 diabetes
        </button>
        <button className="inline-block h-10 bg-blue-200 rounded-3xl shadow-lg hover:bg-blue-100 focus:outline-none mb-8 text-blue-900 font-semibold px-2">
          Metabolic Syndrome
        </button>
        <button className="inline-block h-10 bg-blue-200 rounded-3xl shadow-lg hover:bg-blue-100 focus:outline-none mb-8 text-blue-900 font-semibold px-2">
          Cancer
        </button>
      </div> */}

      <div className="flex flex-wrap justify-center space-x-2 mb-3">
        {[
          "Obesity",
          "Cardiovascular disease",
          "Hypertension",
          "Stroke",
          "Type 2 diabetes",
          "Metabolic Syndrome",
          "Cancer",
        ].map((condition, index) => (
          <button
            key={index}
            className={`inline-block h-10 rounded-3xl shadow-lg focus:outline-none mb-8 font-semibold px-2 ${
              activeButton === index
                ? "bg-blue-100 text-blue-700"
                : "bg-blue-200 text-blue-900"
            } hover:bg-blue-100`}
            onClick={() => handleButtonClick(index)}
          >
            {condition}
          </button>
        ))}
      </div>

      <div className="relative px-8 py-3 mb-1">
        <img
          src="../public/inputmedicalconditions.jpg"
          alt=""
          className="block w-full h-auto rounded-md"
        />
        <div className="absolute top-0 right-0 flex items-center justify-center p-4">
          <div className="flex flex-col justify-center items-center bg-white bg-opacity-80 rounded-md p-4">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-semibold text-gray-900 dark:text-black"
            >
              Add illustrations
            </label>
            <textarea
              id="message"
              rows={6}
              className="w-full block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              placeholder="Write your medical conditions here..."
            ></textarea>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-5">
        <button
          type="button"
          className="mb-3 w-3/4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default InputMedicalConditions;
