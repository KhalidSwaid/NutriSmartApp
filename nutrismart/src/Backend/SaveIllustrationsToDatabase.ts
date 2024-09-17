import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const db = getFirestore();

// Function to save the illustration data to Firestore
export async function saveIllustrationToDatabase(
  userId: string,
  dataArray: [string, string, string, string, string, string],
) {
  try {
    // Reference to the 'usersIllustrations' document in the 'users' collection
    const userIllustrationsRef = doc(db, "users", "usersIllustrations");

    // Get the current data for 'usersIllustrations'
    const docSnapshot = await getDoc(userIllustrationsRef);

    if (docSnapshot.exists()) {
      // If the document already exists, update the user's illustrations map
      await updateDoc(userIllustrationsRef, {
        [userId]: {
          ImageContent: dataArray[0],
          Illustrations: dataArray[1],
          Calories: dataArray[2],
          Protein: dataArray[3],
          Carbs: dataArray[4],
          Sugar: dataArray[5],
        },
      });
      console.log(
        `Illustration data updated successfully for user ${userId} in Firestore!`,
      );
    } else {
      // If the document does not exist, create it with the initial user's illustrations
      await setDoc(userIllustrationsRef, {
        [userId]: {
          ImageContent: dataArray[0],
          Illustrations: dataArray[1],
          Calories: dataArray[2],
          Protein: dataArray[3],
          Carbs: dataArray[4],
          Sugar: dataArray[5],
        },
      });
      console.log(
        `Illustration data saved successfully for user ${userId} to Firestore!`,
      );
    }
  } catch (error) {
    console.error("Error saving illustration data to Firestore:", error);
  }
}
