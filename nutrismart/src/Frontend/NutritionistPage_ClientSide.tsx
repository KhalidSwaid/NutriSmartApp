import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Question } from "../types/Question";
import { useUserContext } from "../Frontend/UserContext";
import { UpdateUserQuestions } from "../Backend/UpdateUserQuestions";

const NutritionistPage_ClientSide: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [containerHeight, setContainerHeight] = useState(0); // Start height
  const { userInfo } = useUserContext();

  const handleBackButton = () => {
    navigate("/userPage"); // Replace '/userPage' with your desired route
  };

  useEffect(() => {
    if (questions.length === 0) {
      setContainerHeight(0);
    } else if (questions.length === 1) {
      setContainerHeight(100); // Reset height when no questions
    } else if (questions.length === 2) {
      setContainerHeight(200); // Height for 1-2 questions
    } else {
      setContainerHeight(280); // Max height
    }
  }, [questions.length]);

  const handleAddQuestionButton = () => {
    if (title && email && content) {
      const newQuestion = { title, email, content };
      setQuestions([newQuestion, ...questions]);
      UpdateUserQuestions(userInfo, newQuestion); // Call the function to log user info and question
      setTitle("");
      setEmail("");
      setContent("");
    }
  };

  const handleDeleteQuestionButton = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  return (
    <div className="relative bg-zinc-50 text-center text-surface dark:text-black pb-1 w-full h-screen overflow-auto">
      <nav className="max-w-screen-xl flex items-center justify-between mx-auto p-5 bg-white relative z-10 mb-1">
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

      {questions.length >= 0 && (
        <div
          className="questions overflow-y-auto px-5 transition-all duration-700"
          style={{ height: `${containerHeight}px` }}
        >
          {questions.map((question, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 mb-1 relative"
            >
              <button
                className="absolute top-2 right-2 text-red-500"
                onClick={() => handleDeleteQuestionButton(index)}
              >
                X
              </button>
              <h2 className="text-xl font-bold">{question.title}</h2>
              <h3 className="text-sm text-gray-600">{question.email}</h3>
              <p>{question.content}</p>
            </div>
          ))}
        </div>
      )}

      <div className="px-5">
        <form
          action=""
          className="flex flex-col mb-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddQuestionButton();
          }}
        >
          <input
            placeholder="Title"
            required
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-md mb-4"
          />
          <input
            placeholder="Email"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md mb-4"
          />
          <textarea
            name=""
            placeholder="Content..."
            id=""
            rows={6}
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="rounded-md mb-4"
          ></textarea>
          <button
            type="submit"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Add Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default NutritionistPage_ClientSide;
