import { db } from "../Frontend/firebase"; // Adjust the import according to your Firebase config file path
import { getDoc, doc, updateDoc, collection } from "firebase/firestore";
import { UserInfo } from "../types/UserInfo"; // Ensure the correct path to your UserInfo.ts file

//Function to check if a user already exists in the database
export const checkUserExists = async (email: string): Promise<any> => {
  try {
    const usersRef = collection(db, "users");
    const usersInfoRef = doc(usersRef, "usersInfo");
    const usersInfoSnapshot = await getDoc(usersInfoRef);

    if (usersInfoSnapshot.exists()) {
      const userData = usersInfoSnapshot.data();

      console.log(userData);

      for (const userId in userData) {
        const userInfo = userData[userId];
        if (userInfo.email === email) {
          console.log("User found in the database", userInfo);
          return userInfo;
        }
      }
      // return userData.hasOwnProperty(email);
    }
    console.log("User is not in database!");
    return null;
  } catch (error) {
    console.error("Error checking user existance:", error);
    throw error;
  }
};

//Function to save user information to the database
export const saveUserToDatabase = async (userInfo: UserInfo): Promise<void> => {
  try {
    const usersInfoRef = doc(collection(db, "users"), "usersInfo");
    await updateDoc(usersInfoRef, {
      [userInfo.id]: {
        email: userInfo.email,
        password: userInfo.password,
        phoneNumber: userInfo.phoneNumber,
        isOnline: userInfo.isOnline,
        id: userInfo.id,
      },
    });
  } catch (error) {
    console.error("Error saving user to database:", error);
    throw error;
  }
};

// Function to extract all data from 'usersInfo' document
export const getAllUsersInfo = async (): Promise<any> => {
  try {
    // Reference to the 'usersInfo' document in the 'users' collection
    const usersInfoRef = doc(collection(db, "users"), "usersInfo");

    // Get the document snapshot
    const usersInfoSnapshot = await getDoc(usersInfoRef);

    if (usersInfoSnapshot.exists()) {
      const allUserData = usersInfoSnapshot.data(); // Extract all data
      console.log("All Users Data:", allUserData); // Debugging: print all users' data
      return allUserData; // Return the extracted data
    } else {
      console.log("No such document exists!");
      return null; // Return null if the document doesn't exist
    }
  } catch (error) {
    console.error("Error fetching all users information:", error);
    throw error; // Re-throw the error for further handling
  }
};

// Function to check user information and validate password
export const checkCorrectPassword = async (
  email: string,
  password: string, // Accept password as an additional parameter
): Promise<boolean> => {
  // Change return type to Promise<boolean>
  try {
    // Get all users' data
    const allUsersData = await getAllUsersInfo();
    if (allUsersData) {
      console.log("All Users Information:");
      console.log(allUsersData); // Print all users' data

      // Iterate over allUsersData to find the user with the given email
      for (const userId in allUsersData) {
        const userInfo = allUsersData[userId];

        // Check if the current user's email matches the provided email
        if (userInfo.email === email) {
          console.log(`User found with email: ${email}, ID: ${userId}`);

          // Check if the provided password matches the stored password
          if (userInfo.password === password) {
            console.log("Password is correct.");
            return true; // Return true if password is correct
          } else {
            console.log("Password is incorrect.");
            return false; // Return false if password is incorrect
          }
        }
      }

      // If no user is found with the provided email
      console.log(`User with email ${email} does not exist in the database.`);
      return false; // Return false if user is not found
    } else {
      console.log("No user data found in the database.");
      return false; // Return false if no user data is found
    }
  } catch (error) {
    console.error("Error in printing user and all users information:", error);
    return false; // Return false in case of an error
  }
};
