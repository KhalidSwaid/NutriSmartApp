import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const db = getFirestore();

// Function to save the illustration data to Firestore
export async function saveIllustrationToDatabase(
  userId: string,
  dataArray: [string, string, string, string, string, string],
) {
  try {
    // Reference to the user's document inside the 'usersIllustrations' collection
    const userDocRef = doc(db, "usersIllustrations", userId);

    console.log("USER ID FROM BACKEND", userId);

    // Check if the document already exists
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      // If the document exists, update the existing data
      console.log(`Document for user ${userId} already exists. Updating...`);

      const existingData = userDocSnap.data();

      // Merge existing data with the new data
      const updatedData = {
        ...existingData,
        imageContent: dataArray[0],
        Illustrations: dataArray[1],
        Calories: dataArray[2],
        Protein: dataArray[3],
        Carbs: dataArray[4],
        Sugar: dataArray[5],
      };

      // Save the structured data in Firestore with merging
      await setDoc(userDocRef, updatedData, { merge: true });

      console.log("Illustration data updated successfully in Firestore!");
    } else {
      // If the document does not exist, create a new one
      console.log(
        `Document for user ${userId} does not exist. Creating new...`,
      );

      // Structuring data to save in Firestore
      const illustrationData = {
        imageContent: dataArray[0],
        Illustrations: dataArray[1],
        Calories: dataArray[2],
        Protein: dataArray[3],
        Carbs: dataArray[4],
        Sugar: dataArray[5],
      };

      // Save the structured data in Firestore
      await setDoc(userDocRef, illustrationData);

      console.log("Illustration data saved successfully to Firestore!");
    }
  } catch (error) {
    console.error("Error saving illustration data to Firestore: ", error);
  }
}
