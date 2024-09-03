import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db, auth } from "./firebase"; // Assuming you have initialized your Firebase app and exported the 'db' instance
// import { signInWithEmailAndPassword } from "firebase/auth";
import { checkUserExists } from "../Backend/DatabaseUtils";
import { useUserContext } from "./UserContext";
// import { Spinner } from "@material-tailwind/react";

function UserLoginPage() {
  const navigate = useNavigate();
  const { setUserInfo } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successLoginMessage, setSuccessLoginMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBackButton = () => {
    navigate("/");
  };

  const handleLoginButton = async () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setErrorMessage("Invalid email format, email must be domain@example.com");
      return;
    }

    if (!email || !password) {
      setErrorMessage("Please enter both email and password");
      return;
    }

    // try {
    //   // Sign in the user with email and password
    //   await signInWithEmailAndPassword(auth, email, password);

    //   // Query Firestore after successful authentication
    //   const usersRef = collection(db, "users");
    //   const q = query(usersRef, where("email", "==", email));
    //   const querySnapshot = await getDocs(q);

    //   if (querySnapshot.empty) {
    //     setErrorMessage("Email not found. Please sign up.");
    //     return;
    //   }

    //   querySnapshot.forEach((doc) => {
    //     const userData = doc.data();
    //     if (userData.password !== password) {
    //       setErrorMessage("Incorrect password. Please try again.");
    //     } else {
    //       // Password matches, proceed with login
    //       navigate("/userPage");
    //     }
    //   });
    // } catch (error) {
    //   console.error("Error logging in:", error);
    //   setErrorMessage("An error occurred while logging in.");
    // }

    setLoading(true);
    setErrorMessage("");
    setSuccessLoginMessage("");
    try {
      // Check if the user exists in the database
      const userExists = await checkUserExists(email);

      if (userExists) {
        // Sign in the user with email and password
        // await signInWithEmailAndPassword(auth, email, password);

        const userdata = userExists;
        setUserInfo(userdata);
        console.log("printing userdata from UserLoginPage.tsx", userdata);

        setTimeout(() => {
          setLoading(false);
          setSuccessLoginMessage("Welcome!");
          setTimeout(() => {
            navigate("/userPage");
          }, 1000);

          // Navigate to user page
          // navigate("/userPage");
        }, 2000);
        console.log("User Exists!");
        setSuccessLoginMessage("Welcome!");

        // Navigate to user page
        // navigate("/userPage");
      } else {
        setLoading(false);
        setErrorMessage("Email not found. Please sign up.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("An error occurred while logging in.");
    }
  };

  return (
    <div className="bg-zinc-50 text-center text-surface dark:text-black">
      <div className="relative max-w-xl mx-auto">
        <img src="/vegetables.jpg" alt="" className="w-full opacity-60" />
        <div className="absolute inset-0 flex flex-col items-top justify-left px-6 pt-20">
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
          <h1 className="text-5xl text-center mb-3">NutriSmart</h1>
          <p className="font-bold">
            "Nutrition is not just about eating, it's about nourishing your
            body, mind, and soul with the right ingredients for vitality and
            longevity."
          </p>
        </div>
      </div>

      <div className="mt-6 px-10">
        <h2 className="text-left font-semibold">Email</h2>
        <label
          htmlFor="email"
          className="block mb-2 test-sm font-medium text-gray-900 dark:text-black"
        ></label>
        <input
          type="email"
          id="email"
          className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="email@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mt-6 px-10">
        <h2 className="text-left font-semibold">Password</h2>
        <label
          htmlFor="password"
          className="block mb-2 test-sm font-medium text-gray-900 dark:text-black"
        ></label>
        <input
          type="password"
          id="password"
          className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {/* {successLoginMessage && (
        <p className="text-green-500 mt-2">{successLoginMessage}</p>
      )}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>} */}

      <div className="mt-6 px-10 justify-center items-center">
        {successLoginMessage && (
          <div className="flex items-center space-x-2">
            <p className="text-green-500">{successLoginMessage}</p>
            {loading && (
              <div
                className="animate-spin inline-block h-6 w-6 border-[3px] border-current border-t-transparent text-gray-800 rounded-full dark:text-green-500"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
        )}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>

      <button
        type="button"
        className="mt-12 mb-3 w-1/2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={handleLoginButton}
      >
        Log In
      </button>
    </div>
  );
}

export default UserLoginPage;
