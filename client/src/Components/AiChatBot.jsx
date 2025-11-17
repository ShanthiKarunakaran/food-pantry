import { useState } from "react";
import "./AiChatBot.css";

function AiChatBot() {
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(false);
  const [userInputText, setUserInputText] = useState("");
  const [chatMessagesList, setChatMessagesList] = useState([]);

  const backendBaseUrl = "http://localhost:3001";

  function handleChatBubbleToggleClick() {
    setIsChatWindowOpen((prev) => !prev);
  }

  function handleUserInputChange(e) {
    setUserInputText(e.target.value);
  }

  async function handleChatFormSubmit(e) {
    e.preventDefault();

    const trimmed = userInputText.trim();
    if (!trimmed) return;

    const newUserMessage = {
      senderType: "user",
      messageText: trimmed,
    };

    setChatMessagesList((prev) => [...prev, newUserMessage]);
    setUserInputText("");

    try {
      const apiResponse = await fetch(`${backendBaseUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessageText: trimmed }),
      });

      const data = await apiResponse.json();
      const reply = data.replyText || "Sorry, I could not generate a response.";

      const newAssistantMessage = {
        senderType: "assistant",
        messageText: reply,
      };

      setChatMessagesList((prev) => [...prev, newAssistantMessage]);
    } catch (error) {
      const errorMessage = {
        senderType: "assistant",
        messageText: "There was a problem reaching the Food Pantry AI.",
      };

      setChatMessagesList((prev) => [...prev, errorMessage]);
    }
  }

  return (
    <>
      <button
        className="food-pantry-chat-bubble-button"
        onClick={handleChatBubbleToggleClick}
      >
        <span>💬</span>
      </button>

      {isChatWindowOpen && (
        <div className="food-pantry-chat-window">
          <div className="food-pantry-chat-header">
            <span>Food Pantry AI Helper</span>
            <button
              className="food-pantry-chat-close-button"
              onClick={handleChatBubbleToggleClick}
            >
              ✕
            </button>
          </div>

          <div className="food-pantry-chat-messages">
            {chatMessagesList.map((msg, index) => (
              <p
                key={index}
                className={
                  msg.senderType === "user"
                    ? "food-pantry-chat-message food-pantry-chat-message-user"
                    : "food-pantry-chat-message food-pantry-chat-message-assistant"
                }
              >
                <strong>{msg.senderType === "user" ? "You: " : "AI: "}</strong>
                {msg.messageText}
              </p>
            ))}
          </div>

          <form
            className="food-pantry-chat-form"
            onSubmit={handleChatFormSubmit}
          >
            <input
              type="text"
              className="food-pantry-chat-input"
              placeholder="Ask about gluten-free, vegan, celiac options..."
              value={userInputText}
              onChange={handleUserInputChange}
            />
            <button type="submit" className="food-pantry-chat-send-button">
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default AiChatBot;
