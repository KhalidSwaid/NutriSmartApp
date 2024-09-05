import { UserInfo } from "../types/UserInfo";
import { Question } from "../types/Question";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore"; // Import necessary functions

const db = getFirestore(); // Get Firestore instance

export const UpdateUserQuestions = async (
  userInfo: UserInfo,
  question: Question,
) => {
  try {
    // Extract the username part from the email
    const userKey = userInfo.email.split("@")[0]; // Example: "KhalidS"

    // Reference to the 'usersQuestions' document
    const userQuestionsRef = doc(db, "questions", "usersQuestions");

    // Fetch the current document to determine the next question number
    const docSnapshot = await getDoc(userQuestionsRef);
    let userQuestionsData: any = docSnapshot.exists()
      ? docSnapshot.data()[userKey] || {}
      : {};

    // Determine the next question key
    const questionKeys = Object.keys(userQuestionsData).filter((key) =>
      key.startsWith("Question "),
    );
    let nextQuestionNumber =
      questionKeys.length > 0
        ? Math.max(...questionKeys.map((key) => parseInt(key.split(" ")[1]))) +
          1
        : 1;

    // New question key
    const newQuestionKey = `Question ${nextQuestionNumber}`;

    // Prepare the new question data as a nested object
    const newQuestionData = {
      title: question.title, // title
      email: question.email, // email
      content: question.content, // content
      answer: "", // empty answer initially
    };

    // Add the new question data to the existing user's questions
    userQuestionsData[newQuestionKey] = {
      [question.title]: newQuestionData, // Using the title as the key inside the map
    };

    // Update Firestore document for the user
    await updateDoc(userQuestionsRef, { [userKey]: userQuestionsData });

    console.log("Question successfully added to Firestore.");
  } catch (error) {
    console.error("Error updating user questions:", error);
  }
};
