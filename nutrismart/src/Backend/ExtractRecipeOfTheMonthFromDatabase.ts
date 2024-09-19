import { getFirestore, doc, getDoc } from "firebase/firestore";

// Initialize Firestore
const db = getFirestore();

// Function to extract the recipe of the month
export async function getRecipeOfTheMonth(): Promise<{
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
      let bestRecipe: { name: string; content: string; rate: number } | null =
        null;

      for (const [recipeName, recipeDetails] of Object.entries(
        recipesData || {},
      )) {
        if (
          recipeDetails &&
          recipeDetails.isDessert === false && // Check if the recipe is not a dessert
          recipeDetails.rate > (bestRecipe?.rate || 0) // Check if this recipe has a higher rate
        ) {
          bestRecipe = {
            name: recipeName,
            content: recipeDetails.content,
            rate: recipeDetails.rate,
          };
        }
      }

      if (bestRecipe) {
        console.log("Best Recipe of the Month:", bestRecipe);
        return bestRecipe;
      } else {
        console.log("No recipe found that meets the criteria.");
        return null;
      }
    } else {
      console.log("No recipesAndDesserts document found.");
      return null;
    }
  } catch (error) {
    console.error(
      "Error extracting recipe of the month from Firestore:",
      error,
    );
    return null;
  }
}

// Usage example (remove this part if you're integrating with another file)
// getRecipeOfTheMonth().then((recipe) => {
//   if (recipe) {
//     console.log("Recipe of the Month:", recipe);
//   }
// });
