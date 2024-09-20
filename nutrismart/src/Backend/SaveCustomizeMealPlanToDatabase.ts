// File: SaveCustomizeMealPlanToDatabase.ts
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const db = getFirestore();

// Function to save the customized meal plan to Firestore
export async function saveCustomizedMealPlanToDatabase(
  userId: string,
  selectedPlan: string[],
  selectedGoal: string[],
  selectedFoodType: string[],
  illustrations: string,
  aiReply: string,
) {
  try {
    // Reference to the 'usersCustomizedMealPlan' document in the 'users' collection
    const userMealPlanRef = doc(db, "users", "usersCustomizedMealPlan");

    // Get the current data for 'usersCustomizedMealPlan'
    const docSnapshot = await getDoc(userMealPlanRef);

    const userData = {
      planType: selectedPlan,
      goal: selectedGoal,
      foodType: selectedFoodType,
      illustrations: illustrations,
      plan: aiReply,
    };

    if (docSnapshot.exists()) {
      // If the document already exists, update the user's meal plan map
      await updateDoc(userMealPlanRef, {
        [userId]: userData,
      });
      console.log(
        `Customized meal plan updated successfully for user ${userId} in Firestore!`,
      );
    } else {
      // If the document does not exist, create it with the initial user's meal plan
      await setDoc(userMealPlanRef, {
        [userId]: userData,
      });
      console.log(
        `Customized meal plan saved successfully for user ${userId} to Firestore!`,
      );
    }
  } catch (error) {
    console.error("Error saving customized meal plan to Firestore:", error);
  }
}
