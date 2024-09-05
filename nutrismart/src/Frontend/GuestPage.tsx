//Continue with the cards, try to make the text on the image relative to the image, not to the div
import { useNavigate } from "react-router-dom";
// import chickenSaladImage from "../public/chicken-salad.jpg";
// import panckaeImage from "../public/pancake.jpg";

function GuestPage() {
  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate("/");
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
    </div>
  );
}

export default GuestPage;
