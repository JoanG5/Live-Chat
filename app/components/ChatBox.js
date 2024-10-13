import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { useRef } from "react";
import ChatMessage from "./ChatMessage";

function ChatBox({ msg }) {
  const dummy = useRef();
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const messagesQuery = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(25)
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messagesArray = snapshot.docs.map((doc) => doc.data());
      setChatMessages(messagesArray);
    });

    return () => unsubscribe();
  }, []);

  const addMessage = async (e) => {
    e.preventDefault();
    if (!message) return;
    const newMessage = {
      message: message,
      createdAt: new Date(),
    };
    await addDoc(collection(db, "messages"), newMessage);
    setMessage("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-grow p-6 overflow-auto">
        {chatMessages.map((msg, index) => (
          <ChatMessage key={index} msg={msg} />
        ))}
        <span ref={dummy}></span>
      </div>
      <form
        onSubmit={addMessage}
        className="p-4 bg-white border-t border-gray-200"
      >
        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatBox;
