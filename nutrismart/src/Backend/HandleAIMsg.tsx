// Access the API key from environment variables
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// Function to send a message to the OpenAI API and get a response
export async function sendMessageToOpenAI(message: string): Promise<string> {
  // Prepare the message in the format expected by the OpenAI API
  const systemMessage = {
    role: "system",
    content:
      "You are a nutritionist providing expert advice on nutrition, diet, and healthy eating habits. Answer all questions as a knowledgeable nutritionist.",
  };

  const userMessage = {
    role: "user",
    content: message,
  };

  const apiRequestBody = {
    model: "gpt-4",
    messages: [systemMessage, userMessage],
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message);
    }

    const data = await response.json();
    console.log("API Response:", data); // Log the complete response for debugging

    if (!data.choices || data.choices.length === 0) {
      throw new Error("No choices in API response");
    }

    // Extract the response from the API data
    const chatGPTResponse = data.choices[0].message.content;

    return chatGPTResponse;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      return "Error: " + error.message;
    } else {
      console.error("Unexpected error:", error);
      return "An unexpected error occurred.";
    }
  }
}
