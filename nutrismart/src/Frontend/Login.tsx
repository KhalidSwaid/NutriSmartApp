// src/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { getDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
// import { auth } from "./firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { useUserContext } from "./UserContext";
// import { UserInfo } from "../types/UserInfo";
import { checkUserExists } from "../Backend/DatabaseUtils";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useUserContext();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [id, setId] = useState<string>("");

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

    // try {
    //   const userCredential = await createUserWithEmailAndPassword(
    //     auth,
    //     email,
    //     password,
    //   );
    //   const userInfo: UserInfo = { email, password, phoneNumber, id };

    //   setUserInfo(userInfo);

    //   const usersInfoRef = doc(collection(db, "users"), "usersInfo");
    //   const usersInfoSnapshot = await getDoc(usersInfoRef);

    //   if (usersInfoSnapshot.exists()) {
    //     const usersData = usersInfoSnapshot.data();
    //     if (usersData) {
    //       const mapNames = Object.keys(usersData); // Get array of map names
    //       console.log("Map Names:", mapNames); // Print map names to console
    //     }
    //   }

    //   navigate("/otpPage");
    // } catch (error) {
    //   if (
    //     error instanceof Error &&
    //     error.message.includes("auth/weak-password")
    //   ) {
    //     setErrorMessage("Password should be at least 6 characters");
    //   } else {
    //     console.error("Error signing up:", error);
    //     setErrorMessage("User Already Exists!");
    //   }
    // }

    try {
      const userExists = await checkUserExists(email);
      if (userExists) {
        setErrorMessage("User already exists");
        return;
      }

      // const userCredential = await createUserWithEmailAndPassword(
      //   auth,
      //   email,
      //   password,
      // );
      const userInfo = { email, password, phoneNumber, id };

      setUserInfo(userInfo);
      // await saveUserToDatabase(userInfo);

      navigate("/otpPage");
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
        className="mb-5 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={handleSignUpWithEmailButton}
      >
        Sign up with email
      </button>
      <div className="flex items-center justify-center mb-5">
        <hr className="mt-1 h-px bg-gray-200 border-1 dark:bg-gray-200 flex-grow ml-4 mr-1" />
        <p className="text-gray-500">or continue with</p>
        <hr className="mt-1 h-px bg-gray-200 border-1 dark:bg-gray-200 flex-grow ml-1 mr-4" />
      </div>
      <button
        type="button"
        className="flex items-center justify-center mb-5 w-full text-black bg-gray-300 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        <svg
          className="h-6 w-6 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          xlinkHref="http://www.w3.org/1999/xlink"
          width="800px"
          height="800px"
          viewBox="-0.5 0 48 48"
          version="1.1"
        >
          {" "}
          <title>Google-color</title> <desc>Created with Sketch.</desc>{" "}
          <defs> </defs>{" "}
          <g
            id="Icons"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            {" "}
            <g id="Color-" transform="translate(-401.000000, -860.000000)">
              {" "}
              <g id="Google" transform="translate(401.000000, 860.000000)">
                {" "}
                <path
                  d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                  id="Fill-1"
                  fill="#FBBC05"
                >
                  {" "}
                </path>{" "}
                <path
                  d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                  id="Fill-2"
                  fill="#EB4335"
                >
                  {" "}
                </path>{" "}
                <path
                  d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                  id="Fill-3"
                  fill="#34A853"
                >
                  {" "}
                </path>{" "}
                <path
                  d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                  id="Fill-4"
                  fill="#4285F4"
                >
                  {" "}
                </path>{" "}
              </g>{" "}
            </g>{" "}
          </g>{" "}
        </svg>
        <span className="font-bold">Google</span>
      </button>

      <div className="flex items-center mt-4 text-xs justify-center mb-5">
        <p className="text-gray text-center">
          By clicking continue, you agree to our{" "}
          <a href="/terms" className="font-bold">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="font-bold">
            Privacy Policy
          </a>
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
