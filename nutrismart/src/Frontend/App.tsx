import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./UserContext";
import Login from "./Login";
import GuestPage from "./GuestPage";
import UserLoginPage from "./UserLoginPage";
import UserPage from "./UserPage";
import InputGoals from "./InputGoals";
import InputMedicalConditions from "./InputMedicalConditions";
import CustomizeMealPlan from "./CustomizeMealPlan";
import NSChatBot from "./NSChatBot";
import RecipesAndDesserts from "./RecipesAndDesserts";
import GuestPageController from "../Controllers/GuestPageController";
import UserPageController from "../Controllers/UserPageController";
import NutritionistPage_ClientSide from "./NutritionistPage_ClientSide";
import Terms from "./Terms";
import PrivacyPolicy from "./PrivacyPolicy";
import ResultPage from "./ResultsPage";
import BestRecipeOfTheMonth from "./BestRecipeOfTheMonth";
import BestDessertOfTheMonth from "./BestDessertOfTheMonth";
import CustomizeMealPlanResults from "./CustomizeMealPlanResults";
import UserPlan from "./UserPlan";

const App: React.FC = () => {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/guest" element={<GuestPage />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/userPage" element={<UserPage />} />
          <Route path="/userPlan" element={<UserPlan />} />
          <Route
            path="/bestRecipeOfTheMonth"
            element={<BestRecipeOfTheMonth />}
          />
          <Route
            path="/bestDessertOfTheMonth"
            element={<BestDessertOfTheMonth />}
          />
          <Route path="/inputGoals" element={<InputGoals />} />
          <Route path="/resultsPage" element={<ResultPage />} />
          <Route
            path="/inputMedicalConditions"
            element={<InputMedicalConditions />}
          />

          <Route path="/customizeMealPlan" element={<CustomizeMealPlan />} />
          <Route
            path="/customizeMealPlanResults"
            element={<CustomizeMealPlanResults />}
          />
          <Route path="/recipesAndDesserts" element={<RecipesAndDesserts />} />
          <Route path="/NSChatBot" element={<NSChatBot />} />
          <Route
            path="/guestPageController"
            element={<GuestPageController />}
          />
          <Route
            path="/nutritionistPage"
            element={<NutritionistPage_ClientSide />}
          />
          <Route path="/userPageController" element={<UserPageController />} />
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
