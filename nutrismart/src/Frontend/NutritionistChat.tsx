import { useNavigate } from "react-router-dom";

function NutritionistChat() {
  const navigate = useNavigate();
  const handleNutritionistChatButton = () => {
    navigate("/userPage");
  };

  return (
    <div className="relative bg-zinc-50  text-center text-surface dark:text-black pb-1 w-full">
      <nav className="max-w-screen-xl flex items-center justify-between mx-auto p-5 bg-white relative z-10 mb-10">
        <button
          type="button"
          className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          onClick={handleNutritionistChatButton}
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
    </div>
  );
}

export default NutritionistChat;
