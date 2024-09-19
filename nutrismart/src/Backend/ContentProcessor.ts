import { getFirestore, doc, getDoc } from "firebase/firestore"; // Import Firestore functions

// Initialize Firestore
const db = getFirestore(); // Ensure Firestore is initialized correctly in your environment

// Initialize an array to store all the data (now used only to store all collected data, if needed)
const dataArray: Array<[string, string, string, string, string, string]> = [];

// Function to get the Firestore database instance
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

// Function to fetch medical conditions and illustrations from Firestore
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

// Function to fetch user goals from Firestore
async function fetchUserGoal(userId: string): Promise<{
  plans: string[];
  goals: string[];
  foodTypes: string[];
  illustrations: string[];
} | null> {
  try {
    // Reference the 'usersGoals' document in the 'users' collection
    const userGoalsRef = doc(db, "users", "usersGoals");
    const userDoc = await getDoc(userGoalsRef); // Get the document

    if (userDoc.exists()) {
      const userData = userDoc.data(); // Fetch the data from the document
      const userMap = userData ? userData[userId] : null; // Extract the user's specific data using the userId

      if (userMap) {
        const plans = userMap.plans || [];
        const goals = userMap.goals || [];
        const foodTypes = userMap.foodTypes || [];
        const illustrations = userMap.illustrations || [];

        console.log("Fetched user goals:", {
          plans,
          goals,
          foodTypes,
          illustrations,
        });
        return { plans, goals, foodTypes, illustrations }; // Return user's goals and preferences
      }
    }
    console.log(`No goals found for user ID: ${userId}`);
    return null;
  } catch (error) {
    console.error("Error fetching user goals:", error);
    return null;
  }
}

// Function to handle and construct the message to be sent based on the data
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
    const userMedicalData = await fetchUserMedicalConditions(userId);

    // Fetch user goals from Firestore
    const userGoalData = await fetchUserGoal(userId);

    // Create a message in the specified format
    let message = `${dataArray[1]}, I have a plate of: ${dataArray[0]}, I want to reach ${dataArray[2]} calories, ${dataArray[3]} protein, ${dataArray[4]} carbs, ${dataArray[5]} sugar.`;

    if (userMedicalData) {
      const { illustrations, medicalConditions } = userMedicalData;
      const conditionsList = medicalConditions.join(", ");

      // Include medical conditions and illustrations in the message
      message += ` Take into consideration that I have medical conditions: ${conditionsList}, and illustrations: ${illustrations}.`;
    }

    if (userGoalData) {
      const { plans, goals, foodTypes, illustrations } = userGoalData;
      const plansList = plans.join(", ");
      const goalsList = goals.join(", ");
      const foodTypesList = foodTypes.join(", ");
      console.log(illustrations);

      // Include goals, plans, and food types in the message
      message += ` My goals are: ${goalsList}. My preferred plans are: ${plansList}. My preferred food types are: ${foodTypesList}.`;
    }

    console.log(
      "Generated Message to Send with Medical Conditions, Goals, and Preferences:",
      message,
    );
    return message;
  } else {
    console.log(
      "Some fields are missing or have zero values; cannot create a message.",
    );
    return null; // Return null if any field is missing or zero
  }
}
