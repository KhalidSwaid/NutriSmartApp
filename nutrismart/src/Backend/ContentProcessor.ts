import { getFirestore, doc, getDoc } from "firebase/firestore"; // Import Firestore functions

// Initialize an array to store all the data (now used only to store all collected data, if needed)
const dataArray: Array<[string, string, string, string, string, string]> = [];

// Function to get the Firestore database instance
const db = getFirestore(); // Ensure Firestore is initialized correctly in your environment

export function getContent(imageName: string, contentArray: string[]): void {
  console.log(
    `Getting image ${imageName} content - its from backend: `,
    contentArray,
  );
}

// Updated handleIllustrations function to return the constructed array
export function handleIllustrations(
  illustrationContent: string,
  nutritionInfo: Record<string, string>,
  predictions: string[],
): [string, string, string, string, string, string] {
  // Print the content of the illustration
  console.log(`Illustration Content: ${illustrationContent}`);

  // Print the nutrition information in the desired format
  const formattedNutritionInfo = Object.entries(nutritionInfo)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");

  console.log(`Nutrition Info: ${formattedNutritionInfo}`);

  // Prepare the data to be returned in the array
  const newData: [string, string, string, string, string, string] = [
    predictions.join(", "), // Join multiple predictions into a single string
    illustrationContent,
    nutritionInfo.Calories || "0",
    nutritionInfo.Protein || "0",
    nutritionInfo.Carbs || "0",
    nutritionInfo.Sugar || "0",
  ];

  // Print the array to see the contents
  console.log("Generated Data Array:", newData);

  // Return the generated data array
  return newData;
}

export function getDataArray() {
  return dataArray;
}

// New function to fetch medical conditions and illustrations from Firestore
async function fetchUserMedicalConditions(
  userId: string,
): Promise<{ illustrations: string; medicalConditions: string[] } | null> {
  try {
    const userDocRef = doc(db, "users", "usersMedicalConditions"); // Reference the usersMedicalConditions document
    const userDoc = await getDoc(userDocRef); // Get the document

    if (userDoc.exists()) {
      const userData = userDoc.data(); // Fetch the data from the document
      const userMap = userData ? userData[userId] : null; // Extract the user's specific data using the userId

      if (userMap) {
        const illustrations = userMap.illustrations || "";
        const medicalConditions = userMap.medicalConditions || [];
        console.log("Fetched user data:", { illustrations, medicalConditions });

        return { illustrations, medicalConditions }; // Return user's illustrations and medical conditions
      }
    }
    console.log(`No data found for user ID: ${userId}`);
    return null;
  } catch (error) {
    console.error("Error fetching medical conditions:", error);
    return null;
  }
}

export async function handleMsgToSent(
  dataArray: [string, string, string, string, string, string],
  userId: string,
): Promise<string | null> {
  // Check if all fields are filled with content (not "0")
  if (
    dataArray[0] !== "0" &&
    dataArray[1] !== "0" &&
    dataArray[2] !== "0" &&
    dataArray[3] !== "0" &&
    dataArray[4] !== "0" &&
    dataArray[5] !== "0"
  ) {
    // Fetch user medical conditions and illustrations from Firestore
    const userData = await fetchUserMedicalConditions(userId);

    // Create a message in the specified format
    const message = `${dataArray[1]}, I have a plate of: ${dataArray[0]}, I want to reach ${dataArray[2]} calories, ${dataArray[3]} protein, ${dataArray[4]} carbs, ${dataArray[5]} sugar.`;

    if (userData) {
      const { illustrations, medicalConditions } = userData;
      const conditionsList = medicalConditions.join(", ");

      // Include medical conditions and illustrations in the message
      const completeMessage = `${message} Take into consideration that I have medical conditions: ${conditionsList}, and illustrations: ${illustrations}.`;
      console.log(
        "Generated Message to Send with Medical Conditions and Illustrations:",
        completeMessage,
      );
      return completeMessage;
    } else {
      console.log(
        "Generated Message to Send without Medical Conditions:",
        message,
      );
      return message;
    }
  } else {
    console.log(
      "Some fields are missing or have zero values; cannot create a message.",
    );
    return null; // Return null if any field is missing or zero
  }
}
