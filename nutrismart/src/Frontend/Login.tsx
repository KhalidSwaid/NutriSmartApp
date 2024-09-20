import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";
import { checkUserExists } from "../Backend/DatabaseUtils";
import { saveUserToDatabase } from "../Backend/DatabaseUtils";

import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useUserContext();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleGuestButton = () => {
    navigate("/guestPageController");
  };

  const handleLoginButton = () => {
    navigate("/login");
  };

  const handleSignUpWithEmailButton = async () => {
    if (!email || !password || !confirmPassword || !phoneNumber || !id) {
      setErrorMessage("All fields are required");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setErrorMessage("Invalid email format, email must be domain@example.com");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters");
      return;
    }

    if (phoneNumber.trim() === "") {
      setErrorMessage("Phone number is required");
      return;
    }

    try {
      const userExists = await checkUserExists(email);
      if (userExists) {
        setErrorMessage("User already exists");
        return;
      }

      const userInfo = { email, password, phoneNumber, id, isOnline: false };

      setUserInfo(userInfo);

      // Save user information to the database using the imported function
      await saveUserToDatabase(userInfo);

      setTimeout(() => {
        setLoading(true);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }, 2000);
    } catch (error) {
      console.error("Error signing up:", error);
      setErrorMessage("An error occurred during sign-up");
    }
  };

  return (
    <div className="bg-zinc-50 px-6 py-5 text-center text-surface dark:text-black">
      <div className="mb-7 text-3xl font-bold">
        <h1>NutriSmart</h1>
      </div>
      <div className="text-base">
        <p className="font-bold">Create an account</p>
        <p>Enter your email to sign up for this app</p>
      </div>
      <div className="mt-6">
        <input
          type="email"
          id="email"
          className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="email@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          id="password"
          className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          id="confirmPassword"
          className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <div className="mt-6  flex flex-wrap gap-4">
        <div className="flex-grow">
          <input
            type="text"
            id="phoneNumber"
            className="w-full mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Phone Number (+123987654321)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="flex-none w-1/3">
          <input
            type="text"
            id="id"
            className="w-full mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
      </div>

      {errorMessage && <p className="text-red-500 mb-5">{errorMessage}</p>}
      <button
        type="button"
        className="mb-5 w-full flex items-center justify-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={handleSignUpWithEmailButton}
      >
        Sign up with email
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
      <div className="flex items-center justify-center mb-5">
        <hr className="mt-1 h-px bg-gray-200 border-1 dark:bg-gray-200 flex-grow ml-4 mr-1" />
        <p className="text-gray-500">or continue with Login</p>
        <hr className="mt-1 h-px bg-gray-200 border-1 dark:bg-gray-200 flex-grow ml-1 mr-4" />
      </div>

      <div className="flex items-center mt-4 text-xs justify-center mb-5">
        <p className="text-gray text-center">
          By clicking continue, you agree to our{" "}
          <Link to="/terms" className="font-bold">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacyPolicy" className="font-bold">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
      <div>
        <button
          type="button"
          className="mb-3 w-1/2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={handleLoginButton}
        >
          Log In
        </button>
        <button
          type="button"
          className="mb-5 w-1/2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={handleGuestButton}
        >
          Continue as guest
        </button>
      </div>
    </div>
  );
};

export default Login;
