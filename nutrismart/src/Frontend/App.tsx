// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./UserContext";
import Login from "./Login";
import GuestPage from "./GuestPage";
import UserLoginPage from "./UserLoginPage";
import UserPage from "./UserPage";
import InputGoals from "./InputGoals";

import InputMedicalConditions from "./InputMedicalConditions";
import CustomizeMealPlan from "./CustomizeMealPlan";
// import NutritionistChat from "./NutritionistChat";

import OTPVerification from "./OTPage";

import NSChatBot from "./NSChatBot";

import GuestPageController from "./GuestPageController";

import NutritionistPage_ClientSide from "./NutritionistPage_ClientSide";

const App: React.FC = () => {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/guest" element={<GuestPage />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/userPage" element={<UserPage />} />
          <Route path="/inputGoals" element={<InputGoals />} />
          <Route
            path="/inputMedicalConditions"
            element={<InputMedicalConditions />}
          />

          <Route path="/customizeMealPlan" element={<CustomizeMealPlan />} />
          {/* <Route path="/nutritionistChat" element={<NutritionistChat />} /> */}
          <Route path="/otpPage" element={<OTPVerification />} />
          <Route path="/NSChatBot" element={<NSChatBot />} />
          <Route
            path="/guestPageController"
            element={<GuestPageController />}
          />
          <Route
            path="/nutritionistPage"
            element={<NutritionistPage_ClientSide />}
          />
        </Routes>
      </UserProvider>
    </Router>

    // <OTPVerification />
  );
};

export default App;
