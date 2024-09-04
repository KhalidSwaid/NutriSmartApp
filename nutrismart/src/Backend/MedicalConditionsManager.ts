// Initialize an array to hold selected medical conditions
let selectedConditions: string[] = [];

// Function to add a condition to the array
export const addCondition = (condition: string) => {
  if (!selectedConditions.includes(condition)) {
    // Prevent duplicates
    selectedConditions.push(condition);
    console.log(`Condition added: ${condition}`);
  } else {
    console.log(`Condition already exists: ${condition}`);
  }
};

//Here I Have to save selectedConditions to database, under users collection, under usersMedicalConditions,
//We will save for each user an array that have the medical condition for the user, and array name
//will be the user id like this:
//"111222333": [Obesity, Cardiovascular disease, ...]

// Function to get the current list of selected conditions
export const getSelectedConditions = (): string[] => {
  return selectedConditions;
};

// (Optional) Function to clear all selected conditions
export const clearSelectedConditions = () => {
  selectedConditions = [];
  console.log("Selected conditions cleared.");
};
