import React from "react";
import image from "../assets/kitty.png";

function ChatMessage({ msg }) {
  return (
    <div className="mb-4 flex items-start">
      <img
        src={image}
        alt="Profile"
        className="w-10 h-10 rounded-full mr-4"
      />
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p>{msg.message}</p>
      </div>
    </div>
  );
}

export default ChatMessage;
