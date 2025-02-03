import React, { useState, useEffect } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socket = new WebSocket("ws://127.0.0.1:8000/ws/chat/");

  useEffect(() => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data.message]);
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.send(JSON.stringify({ message }));
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <div className="w-full max-w-lg bg-gray-800 rounded-lg p-4 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Link Up Chat</h2>
        <div className="h-96 overflow-y-auto border-b border-gray-600 p-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-2 rounded-lg ${
                index % 2 === 0
                  ? "bg-blue-500 self-end text-right"
                  : "bg-gray-700 text-left"
              }`}
            >
              {msg}
            </div>
          ))}
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            className="flex-1 p-2 bg-gray-700 rounded-lg outline-none"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="ml-2 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
