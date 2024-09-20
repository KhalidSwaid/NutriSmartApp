// File: CustomizeMealPlanContentProcessor.ts

// Define a type for the input parameters
interface MealPlanContent {
  selectedPlan: string[];
  selectedGoal: string[];
  selectedFoodType: string[];
  illustrations: string;
}

// Function to generate a message for the OpenAI API based on the meal plan content
export function processMealPlanContent({
  selectedPlan,
  selectedGoal,
  selectedFoodType,
  illustrations,
}: MealPlanContent): string {
  console.log("Processing Meal Plan Content...");

  // Construct the message based on the meal plan content
  let message = `I would like a meal plan that includes ${selectedPlan.join(", ")}. My main goal is to ${selectedGoal.join(", ")}. I prefer foods such as ${selectedFoodType.join(", ")}.`;

  if (illustrations.trim()) {
    message += ` Additionally, I have the following preferences: ${illustrations}.`;
  }

  console.log("Generated Message for OpenAI:");
  console.log(message);

  console.log("\nMeal Plan Content Processed Successfully!");

  // Return the generated message
  return message;
}
