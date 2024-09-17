import React from "react";
import { useLocation } from "react-router-dom";

const ResultPage: React.FC = () => {
  const location = useLocation();
  const { response } = location.state as { response: string }; // Type assertion to extract response

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">AI Response</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl">
        <p className="text-lg">{response}</p>
      </div>
    </div>
  );
};

export default ResultPage;
