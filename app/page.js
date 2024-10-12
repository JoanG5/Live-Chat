"use client";

import React, { useEffect, useState } from "react";
import { db } from "./firebase/config";
import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

export default function Home() {
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getMessages = async () => {
      const messagesQuery = query(
        collection(db, "messages"),
        orderBy("createdAt", "asc")
      );
      const messages = await getDocs(messagesQuery);
      const messagesArray = messages.docs.map((doc) => doc.data());
      setChatMessages(messagesArray);
    };
    getMessages();
  });

  const addMessage = async (e) => {
    e.preventDefault();
    if (!message) return;
    await addDoc(collection(db, "messages"), {
      message: message,
      createdAt: new Date(),
    });
    setMessage("");
    console.log("Message added!");
  };

  return (
    <div>
      <h1>Live Chat</h1>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <button onClick={addMessage}>Send</button>
      <div>
        {chatMessages.map((chatMessage, index) => (
          <div key={index}>{chatMessage.message}</div>
        ))}
      </div>
    </div>
  );
}
