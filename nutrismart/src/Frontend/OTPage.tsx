import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";
// import { db } from "./firebase";
// import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { saveUserToDatabase } from "../Backend/DatabaseUtils";

const OTPVerification: React.FC = () => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const submitRef = useRef<HTMLButtonElement | null>(null);
  const [, setServerOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  // const handleVerifyButton = () => {
  //   navigate("/login");
  // };
  const { userInfo } = useUserContext();

  useEffect(() => {
    const fetchOtp = async () => {
      try {
        const response = await fetch("http://localhost:5173/send_otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber: userInfo.phoneNumber }),
        });
        const data = await response.json();
        setServerOtp(data.otp);
      } catch (error) {
        console.log(error);
        setErrorMessage("Failed to fetch OTP. Please try again.");
      }
    };

    if (userInfo.phoneNumber) {
      fetchOtp();
    }
  }, [userInfo.phoneNumber]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userOtp = inputsRef.current.map((input) => input?.value).join("");

    try {
      const response = await fetch("http://localhost:5173/verify_otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: userOtp,
          phoneNumber: userInfo.phoneNumber,
        }),
      });
      const data = await response.json();

      if (data.success) {
        //   console.log("YOUR OTP IS CORRECT!");
        //   console.log("YOUR OTP IS: ", serverOtp);

        //   // Encode the email to avoid invalid characters
        //   // const encodedEmail = userInfo.email.replace(/\./g, "_");

        //   // Save user information to Firestore under usersInfo document
        //   const usersInfoDocRef = doc(db, "users", "usersInfo");
        //   await updateDoc(usersInfoDocRef, {
        //     [userInfo.id]: {
        //       email: userInfo.email,
        //       password: userInfo.password,
        //       phoneNumber: userInfo.phoneNumber,
        //     },
        //   });

        //   handleVerifyButton();
        // } else {
        //   console.log("Invalid OTP. Please try again.");
        //   setErrorMessage("Invalid OTP. Please try again.");
        // }
        try {
          await saveUserToDatabase(userInfo);
          navigate("/login");
        } catch (error) {
          setErrorMessage("Failed to verify OTP. Please try again.");
        }
      } else {
        setErrorMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.log("Failed to verify OTP. Please try again.", error);
      setErrorMessage("Failed to verify OTP. Please try again.");
    }
  };

  const handleBackButton = () => {
    navigate("/");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      const index = inputsRef.current.indexOf(e.target as HTMLInputElement);
      if (index > 0) {
        inputsRef.current[index - 1]!.value = "";
        inputsRef.current[index - 1]!.focus();
      }
    }
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const index = inputsRef.current.indexOf(target);
    if (target.value) {
      if (index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1]!.focus();
      } else {
        submitRef.current!.focus();
      }
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!new RegExp(`^[0-9]{${inputsRef.current.length}}$`).test(text)) {
      return;
    }
    const digits = text.split("");
    inputsRef.current.forEach((input, index) => {
      if (input) {
        input.value = digits[index] || "";
      }
    });
    submitRef.current!.focus();
  };

  return (
    <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 rounded-xl shadow">
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
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Mobile Phone Verification</h1>
        <p className="text-[15px] text-slate-500">
          Enter the 5-digit verification code that was sent to your phone
          number.
        </p>
      </header>
      <form id="otp-form" onSubmit={handleSubmit}>
        <div className="flex items-center justify-center gap-3">
          {[...Array(5)].map((_, i) => (
            <input
              key={i}
              type="text"
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              maxLength={1}
              ref={(el) => (inputsRef.current[i] = el)}
              onKeyDown={handleKeyDown}
              onInput={handleInput}
              onFocus={handleFocus}
              onPaste={handlePaste}
            />
          ))}
        </div>
        <div className="max-w-[260px] mx-auto mt-4">
          <button
            type="submit"
            ref={submitRef}
            className="mb-3 w-1/2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Verify Account
          </button>
        </div>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </form>
      <div className="text-sm text-slate-500 mt-4">
        Didn't receive code?{" "}
        <a
          className="font-medium text-indigo-500 hover:text-indigo-600"
          href="#0"
        >
          Resend
        </a>
      </div>
    </div>
  );
};

export default OTPVerification;
