// File: ExtractCustomizeMealPlanFromDatabase.ts

import { getFirestore, doc, getDoc } from "firebase/firestore";

// Initialize Firestore
const db = getFirestore();

// Function to extract the customized meal plan from Firestore
export async function getCustomizedMealPlan(userId: string): Promise<{
  planType: string[];
  goal: string[];
  foodType: string[];
  illustrations: string;
  plan: string;
} | null> {
  try {
    // Reference to the 'usersCustomizedMealPlan' document in the 'users' collection
    const userPlanDocRef = doc(db, "users", "usersCustomizedMealPlan");
    const docSnapshot = await getDoc(userPlanDocRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data(); // Get all the data from the document
      const userPlanData = data ? data[userId] : null; // Get the specific user's data using userId

      if (userPlanData) {
        console.log("Customized Meal Plan for User:", userPlanData);
        return userPlanData; // Return the customized meal plan data
      } else {
        console.log(`No meal plan found for user ID: ${userId}`);
        return null; // Return null if there's no data for this user
      }
    } else {
      console.log("No 'usersCustomizedMealPlan' document found.");
      return null; // Return null if the document does not exist
    }
  } catch (error) {
    console.error("Error fetching customized meal plan from Firestore:", error);
    return null; // Return null if there's an error during the fetching process
  }
}
