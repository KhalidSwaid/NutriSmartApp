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
      },
    });
  } catch (error) {
    console.error("Error saving user to database:", error);
    throw error;
  }
};
