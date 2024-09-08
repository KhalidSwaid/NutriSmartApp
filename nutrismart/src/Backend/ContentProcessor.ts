export function getContent(imageName: string, contentArray: string[]): void {
  console.log(
    `Getting image ${imageName}content - its from backend: `,
    contentArray,
  );
}

export function handleIllustrations(
  illustrationContent: string,
  nutritionInfo: Record<string, string>,
): void {
  // Print the content of the illustration
  console.log(`Illustration Content: ${illustrationContent}`);

  // Print the nutrition information in the desired format
  const formattedNutritionInfo = Object.entries(nutritionInfo)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");

  console.log(`Nutrition Info: ${formattedNutritionInfo}`);
}
