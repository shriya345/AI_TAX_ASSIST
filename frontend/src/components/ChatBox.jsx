import { useState } from "react";
import { sendMessage } from "../services/api";
import MessageBubble from "./MessageBubble";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendMessage(input);

      const botMsg = {
        text: res.data.response || "No response",
        isUser: false,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "Error connecting to server 😭", isUser: false },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[90vh] p-4">
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((msg, i) => (
          <MessageBubble key={i} {...msg} />
        ))}
        {loading && <p>Typing...</p>}
      </div>

      <div className="flex">
        <input
          className="flex-1 border p-2 rounded-l"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask tax question..."
        />
        <button
          className="bg-blue-500 text-white px-4 rounded-r"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;