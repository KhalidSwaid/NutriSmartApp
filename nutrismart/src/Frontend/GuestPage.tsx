import { useNavigate } from "react-router-dom";

function GuestPage() {
  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate("/");
  };

  const handleBestRecipeClick = () => {
    navigate("/bestRecipeOfTheMonth");
  };

  const handleBestDessertClick = () => {
    navigate("/bestDessertOfTheMonth");
  };

  return (
    <div className="bg-zinc-50 px-6 pt-8 pb-10 text-center text-surface dark:text-black ">
      <div className="mb-2 text-3xl font-bold">
        <h1>NutriSmart</h1>
      </div>
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

      <div className="relative max-w-xl mx-auto mt-10 flex justify-between gap-2">
        <div className="w-7/12 rounded overflow-hidden shadow-lg relative">
          <img
            src="/chicken-salad.jpg"
            alt="Chicken Salad image with description"
            className=" rounded-xl w-full h-40"
          />
          <div className="absolute inset-0 opacity-30 rounded-xl"></div>
          <div className="absolute top-0 left-0 p-2">
            <button
              className="focus:outline-none"
              onClick={handleBestRecipeClick}
            >
              <h2
                className="text-white text-2xl font-bold "
                //it's just a shadow for the text on the image, i felt it look like drawing and not real!
                style={{
                  textShadow:
                    "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
                }}
              >
                Best recipe <br />
                of the <br /> month
              </h2>
            </button>
          </div>
          <div className="flex flex-col items-start">
            <div className="font-bold text-sm  mt-1">Recipe of the month</div>
            <p className="text-gray-400 text-xs mb-1">Click to view!</p>
          </div>
        </div>
        <div className="w-7/12 rounded overflow-hidden shadow-lg relative">
          <img
            src="/pancake.jpg"
            alt="Pancake image with description"
            className="rounded-xl w-full h-40"
          />
          <div className="absolute inset-0 opacity-30 rounded-xl"></div>
          <div className="absolute top-0 left-0 p-2">
            <button
              className="focus:outline-none"
              onClick={handleBestDessertClick} // Add your click handler function here
            >
              <h2
                className="text-white text-2xl font-bold"
                // It's just a shadow for the text on the image, to give a drawing effect
                style={{
                  textShadow:
                    "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
                }}
              >
                Best dessert <br />
                of the <br /> month
              </h2>
            </button>
          </div>
          <div className="flex flex-col items-start absolute bottom-2 left-2">
            <div className="font-bold text-sm">Dessert of the month</div>
            <p className="text-gray-400 text-xs">Click to view!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestPage;
