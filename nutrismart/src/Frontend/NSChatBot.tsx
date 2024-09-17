import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  MessageModel,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";

// Access the API key from environment variables
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
console.log("HEY THERE");

function NSChatBot() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<MessageModel[]>([
    {
      message: "Hello, I am Nutri! How can i help?",
      sender: "Nutri",
      direction: "incoming",
      position: "single",
    },
  ]);

  const handleSend = async (message: string) => {
    const newMessage: MessageModel = {
      message: message,
      sender: "user",
      direction: "outgoing",
      position: "single",
    };
    const newMessages = [...messages, newMessage]; // all the new messages plus the new message

    // update our messages state
    setMessages(newMessages);

    // Set a typing indicator (For example: Nutri is typing...)
    setTyping(true);
    // Process message to chatGPT (send it over and see the response)
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages: MessageModel[]) {
    const apiMessages = chatMessages.map((messageObject: MessageModel) => {
      let role = "";
      if (messageObject.sender === "Nutri") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const systemMessage = {
      role: "system",
      content:
        "You are a nutritionist providing expert advice on nutrition, diet, and healthy eating habits. Answer all questions as a knowledgeable nutritionist.",
    };

    const apiRequestBody = {
      model: "gpt-4o",
      messages: [systemMessage, ...apiMessages],
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + API_KEY, // Added a space after 'Bearer'
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }

      const data = await response.json();
      console.log("API Response:", data); // Log the complete response for debugging

      if (!data.choices || data.choices.length === 0) {
        throw new Error("No choices in API response");
      }

      const chatGPTMessage: MessageModel = {
        message: data.choices[0].message.content,
        sender: "Nutri",
        direction: "incoming",
        position: "single",
      };

      setMessages([...chatMessages, chatGPTMessage]);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
        setMessages([
          ...chatMessages,
          {
            message: "Error: " + error.message,
            sender: "Nutri",
            direction: "incoming",
            position: "single",
          } as MessageModel,
        ]);
      } else {
        console.error("Unexpected error:", error);
        setMessages([
          ...chatMessages,
          {
            message: "An unexpected error occurred.",
            sender: "Nutri",
            direction: "incoming",
            position: "single",
          } as MessageModel,
        ]);
      }
    } finally {
      setTyping(false);
    }
  }

  return (
    <div className="relative w-11/12 h-2/5 md:h-1/2 lg:h-screen max-w-screen-lg mx-auto  border border-gray-300 rounded-lg overflow-hidden">
      <MainContainer>
        <ChatContainer>
          <MessageList
            typingIndicator={
              typing ? <TypingIndicator content="Nutri is typing..." /> : null
            }
          >
            {messages.map((message, i) => {
              return (
                <Message className="pt-2" key={i} model={message}></Message>
              );
            })}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            onSend={handleSend}
          ></MessageInput>
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default NSChatBot;
