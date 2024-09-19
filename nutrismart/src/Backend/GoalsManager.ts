import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../Frontend/firebase"; // Adjust the path according to your project structure

// Initialize arrays to hold selected plans, goals, food types, and illustrations
let selectedPlans: string[] = [];
let selectedGoals: string[] = [];
let selectedFoodTypes: string[] = [];
let illustrations: string[] = []; // Array to hold multiple illustrations

// Function to add a plan to the array
export const addPlan = async (plan: string, userId: string) => {
  if (!selectedPlans.includes(plan)) {
    selectedPlans.push(plan); // Prevent duplicates
    console.log(`Plan added: ${plan}`);
    await saveSelectedGoalsToFirestore(userId); // Save updated plans to Firestore
  } else {
    console.log(`Plan already exists: ${plan}`);
  }
};

// Function to add a goal to the array
export const addGoal = async (goal: string, userId: string) => {
  if (!selectedGoals.includes(goal)) {
    selectedGoals.push(goal); // Prevent duplicates
    console.log(`Goal added: ${goal}`);
    await saveSelectedGoalsToFirestore(userId); // Save updated goals to Firestore
  } else {
    console.log(`Goal already exists: ${goal}`);
  }
};

// Function to add a food type to the array
export const addFoodType = async (foodType: string, userId: string) => {
  if (!selectedFoodTypes.includes(foodType)) {
    selectedFoodTypes.push(foodType); // Prevent duplicates
    console.log(`Food type added: ${foodType}`);
    await saveSelectedGoalsToFirestore(userId); // Save updated food types to Firestore
  } else {
    console.log(`Food type already exists: ${foodType}`);
  }
};

// Function to add an illustration to the array
export const addIllustration = async (illustration: string, userId: string) => {
  if (!illustrations.includes(illustration)) {
    illustrations.push(illustration); // Prevent duplicates
    console.log(`Illustration added: ${illustration}`);
    await saveSelectedGoalsToFirestore(userId); // Save updated illustrations to Firestore
  } else {
    console.log(`Illustration already exists: ${illustration}`);
  }
};

// Function to clear all selected data
export const clearSelectedData = () => {
  selectedPlans = [];
  selectedGoals = [];
  selectedFoodTypes = [];
  illustrations = [];
  console.log("All selected data cleared.");
};

// Function to save selected goals, plans, food types, and illustrations to Firestore
export const saveSelectedGoalsToFirestore = async (userId: string) => {
  try {
    // Reference to the 'usersGoals' document in the 'users' collection
    const userGoalsRef = doc(db, "users", "usersGoals");

    // Get the current data for 'usersGoals'
    const docSnapshot = await getDoc(userGoalsRef);

    if (docSnapshot.exists()) {
      // If the document already exists, update the user's data
      await updateDoc(userGoalsRef, {
        [`${userId}.plans`]: arrayUnion(...selectedPlans),
        [`${userId}.goals`]: arrayUnion(...selectedGoals),
        [`${userId}.foodTypes`]: arrayUnion(...selectedFoodTypes),
        [`${userId}.illustrations`]: arrayUnion(...illustrations),
      });
    } else {
      // If the document does not exist, create it with the initial user's data
      await setDoc(userGoalsRef, {
        [userId]: {
          plans: selectedPlans,
          goals: selectedGoals,
          foodTypes: selectedFoodTypes,
          illustrations: illustrations,
        },
      });
    }

    console.log(
      `Goals and preferences for user ${userId} saved to Firestore successfully.`,
    );
  } catch (error) {
    console.error("Error saving goals and preferences to Firestore:", error);
  }
};

// Function to get the current list of selected goals, plans, food types, and illustrations
export const getSelectedData = () => {
  return {
    selectedPlans,
    selectedGoals,
    selectedFoodTypes,
    illustrations,
  };
};
