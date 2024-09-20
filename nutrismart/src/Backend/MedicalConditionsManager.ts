import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../Frontend/firebase";

// Initialize an array to hold selected medical conditions
let selectedConditions: string[] = [];

// Function to add a condition to the array
export const addCondition = async (condition: string, userId: string) => {
  if (!selectedConditions.includes(condition)) {
    // Prevent duplicates
    selectedConditions.push(condition);
    console.log(`Condition added: ${condition}`);
    // Save updated conditions to Firestore
    await saveSelectedConditionsToFirestore(userId);
  } else {
    console.log(`Condition already exists: ${condition}`);
  }
};

// Function to get the current list of selected conditions
export const getSelectedConditions = (): string[] => {
  return selectedConditions;
};

// (Optional) Function to clear all selected conditions
export const clearSelectedConditions = () => {
  selectedConditions = [];
  console.log("Selected conditions cleared.");
};

// Function to save selected conditions to Firestore
export const saveSelectedConditionsToFirestore = async (userId: string) => {
  try {
    // Reference to the 'usersMedicalConditions' document in the 'users' collection
    const userConditionsRef = doc(db, "users", "usersMedicalConditions");

    // Get the current data for 'usersMedicalConditions'
    const docSnapshot = await getDoc(userConditionsRef);

    if (docSnapshot.exists()) {
      // If the document already exists, update the user's conditions array
      await updateDoc(userConditionsRef, {
        [userId]: {
          id: userId,
          medicalConditions: arrayUnion(...selectedConditions),
        },
      });
    } else {
      // If the document does not exist, create it with the initial user's conditions
      await setDoc(userConditionsRef, {
        [userId]: {
          id: userId,
          medicalConditions: selectedConditions,
        },
      });
    }

    console.log(
      `Medical conditions for user ${userId} saved to Firestore successfully.`,
    );
  } catch (error) {
    console.error("Error saving medical conditions to Firestore:", error);
  }
};

// Function to save illustrations to Firestore
export const saveIllustrationsToFirestore = async (
  userId: string,
  illustrations: string,
) => {
  try {
    // Reference to the 'usersMedicalConditions' document in the 'users' collection
    const userConditionsRef = doc(db, "users", "usersMedicalConditions");

    // Get the current data for 'usersMedicalConditions'
    const docSnapshot = await getDoc(userConditionsRef);

    if (docSnapshot.exists()) {
      // If the document already exists, update the user's illustrations
      await updateDoc(userConditionsRef, {
        [`${userId}.illustrations`]: illustrations, // Use dot notation to update nested field
      });
    } else {
      // If the document does not exist, create it with the user's illustrations
      await setDoc(userConditionsRef, {
        [userId]: {
          id: userId,
          illustrations: illustrations, // Save the illustrations
        },
      });
    }

    console.log(
      `Illustrations for user ${userId} saved to Firestore successfully.`,
    );
  } catch (error) {
    console.error("Error saving illustrations to Firestore:", error);
  }
};
