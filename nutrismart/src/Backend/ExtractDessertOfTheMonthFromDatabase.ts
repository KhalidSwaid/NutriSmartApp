import { getFirestore, doc, getDoc } from "firebase/firestore";

// Initialize Firestore
const db = getFirestore();

// Function to extract the dessert of the month
export async function getDessertOfTheMonth(): Promise<{
  name: string;
  content: string;
  rate: number;
} | null> {
  try {
    // Reference to the 'recipesAndDesserts' document in the 'recipes' collection
    const recipesDocRef = doc(db, "recipes", "recipesAndDesserts");
    const docSnapshot = await getDoc(recipesDocRef);

    if (docSnapshot.exists()) {
      const recipesData = docSnapshot.data(); // Fetch the data from the document
      let bestDessert: { name: string; content: string; rate: number } | null =
        null;

      for (const [recipeName, recipeDetails] of Object.entries(
        recipesData || {},
      )) {
        if (
          recipeDetails &&
          recipeDetails.isDessert === true && // Check if the recipe is a dessert
          recipeDetails.rate > (bestDessert?.rate || 0) // Check if this dessert has a higher rate
        ) {
          bestDessert = {
            name: recipeName,
            content: recipeDetails.content,
            rate: recipeDetails.rate,
          };
        }
      }

      if (bestDessert) {
        console.log("Best Dessert of the Month:", bestDessert);
        return bestDessert;
      } else {
        console.log("No dessert found that meets the criteria.");
        return null;
      }
    } else {
      console.log("No recipesAndDesserts document found.");
      return null;
    }
  } catch (error) {
    console.error(
      "Error extracting dessert of the month from Firestore:",
      error,
    );
    return null;
  }
}

// Usage example (remove this part if you're integrating with another file)
// getDessertOfTheMonth().then((dessert) => {
//   if (dessert) {
//     console.log("Dessert of the Month:", dessert);
//   }
// });
