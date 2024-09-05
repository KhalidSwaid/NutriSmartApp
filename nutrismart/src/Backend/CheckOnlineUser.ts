// Import necessary Firestore functions
import { doc, collection, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Frontend/firebase"; // Import your Firestore database instance

// Import the UserInfo type from the Types folder
import { UserInfo } from "../types/UserInfo"; // Adjust the path based on your folder structure

// Function to check if a user is online
export const checkUserOnlineStatus = async (
  userId: string,
): Promise<boolean> => {
  try {
    // Reference to the "users" collection and the specific user document by ID
    const userDocRef = doc(collection(db, "users"), "usersInfo");

    // Retrieve the document snapshot
    const userSnapshot = await getDoc(userDocRef);

    // Check if the document exists and contains the userId
    if (userSnapshot.exists() && userSnapshot.data()[userId]) {
      // Extract the user's information
      const userData = userSnapshot.data()[userId] as UserInfo;

      // Check if the user is online and return the result
      return userData.isOnline;
    } else {
      console.log("User not found in the database.");
      return false;
    }
  } catch (error) {
    console.error("Error checking user online status:", error);
    throw error;
  }
};

// Function to set the user's online status to true
export const setUserOnlineStatus = async (userId: string): Promise<void> => {
  try {
    // Reference to the "users" collection and the specific user document "usersInfo"
    const userDocRef = doc(db, "users", "usersInfo");

    // Update the user's online status to true
    await updateDoc(userDocRef, {
      [`${userId}.isOnline`]: true, // Use Firestore syntax to update nested fields
    });

    console.log(`User ${userId} is now online.`);
  } catch (error) {
    console.error("Error setting user online status:", error);
    throw error;
  }
};

// Function to reset the user's online status to false
export const resetUserOnlineStatus = async (userId: string): Promise<void> => {
  try {
    // Reference to the "users" collection and the specific user document "usersInfo"
    const userDocRef = doc(db, "users", "usersInfo");

    // Update the user's online status to false
    await updateDoc(userDocRef, {
      [`${userId}.isOnline`]: false, // Use Firestore syntax to update nested fields
    });

    console.log(`User ${userId} is now offline.`);
  } catch (error) {
    console.error("Error resetting user online status:", error);
    throw error;
  }
};
