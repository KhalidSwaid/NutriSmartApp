import { UserInfo } from "../types/UserInfo";
import { Question } from "../types/Question";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Import necessary functions

const db = getFirestore(); // Get Firestore instance

export const UpdateUserQuestions = async (
  userInfo: UserInfo,
  question: Question,
) => {
  try {
    // Extract the username part from the email
    const userKey = userInfo.email.split("@")[0];
    console.log(userKey);
    console.log(userInfo);

    // Reference to the 'usersQuestions' document
    const userQuestionsRef = doc(db, "questions", "usersQuestions");

    // Prepare the new question data
    const newQuestionData = {
      title: question.title,
      email: question.email,
      content: question.content,
      answer: "", // Empty answer field initially
    };

    // Update the user's questions
    // Use setDoc with merge option to ensure data is added without overwriting existing data
    await setDoc(
      userQuestionsRef,
      {
        [userKey]: newQuestionData,
      },
      { merge: true },
    );

    console.log("User Info:", userInfo);
    console.log("Question:", question);
    console.log("Question successfully added to Firestore.");
  } catch (error) {
    console.error("Error updating user questions:", error);
  }
};
