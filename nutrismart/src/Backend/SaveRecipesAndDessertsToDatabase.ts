import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

// Initialize Firestore
const db = getFirestore();

// Function to check if the content indicates a dessert
function isDessert(content: string): boolean {
  // List of common dessert keywords
  const dessertKeywords = [
    "cake",
    "cookie",
    "brownie",
    "ice cream",
    "pudding",
    "pie",
    "tart",
    "dessert",
    "chocolate",
    "mousse",
    "sundae",
    "candy",
    "sorbet",
  ];

  // Check if the content contains any of the dessert keywords
  return dessertKeywords.some((keyword) =>
    content.toLowerCase().includes(keyword.toLowerCase()),
  );
}

// Function to save a recipe with a given reason, content, isDessert, and rate
export async function SaveRecipesToDatabase(
  reason: string,
  content: string,
): Promise<void> {
  try {
    // Determine if the recipe is a dessert
    const dessert = isDessert(content);

    // Reference to the 'recipesAndDesserts' document in the 'recipes' collection
    const recipeDocRef = doc(db, "recipes", "recipesAndDesserts");

    // Get the current data for 'recipesAndDesserts'
    const docSnapshot = await getDoc(recipeDocRef);

    if (docSnapshot.exists()) {
      // If the document already exists, update the recipe map with the new entry
      await updateDoc(recipeDocRef, {
        [reason]: {
          content: content,
          isDessert: dessert,
          rate: 0, // Initialize rate as 0 when first saving the recipe
        },
      });
      console.log(
        `Recipe data updated successfully with reason ${reason} in Firestore!`,
      );
    } else {
      // If the document does not exist, create it with the initial recipe entry
      await setDoc(recipeDocRef, {
        [reason]: {
          content: content,
          isDessert: dessert,
          rate: 0, // Initialize rate as 0 when first saving the recipe
        },
      });
      console.log(
        `Recipe data saved successfully with reason ${reason} to Firestore!`,
      );
    }
  } catch (error) {
    console.error("Error saving recipe data to Firestore:", error);
  }
}
