// Initialize an array to store all the data (now used only to store all collected data, if needed)
const dataArray: Array<[string, string, string, string, string, string]> = [];

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
