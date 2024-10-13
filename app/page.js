"use client";

import React from "react";
import { db } from "./firebase/config";
import {
  addDoc,
  collection,
  updateDoc,
  query,
  where,
  getDocs,
  doc,
  limit,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";

import ChatBox from "./components/ChatBox";
import SignIn from "./components/SignIn";

export default function Home() {
  const [user] = useAuthState(auth);

  async function findOrCreateRoom(userId) {
    const roomsRef = query(
      collection(db, "rooms"),
      where("userSize", "<", 2),
      limit(1)
    );
    const rooms = await getDocs(roomsRef);

    if (rooms.docs.length > 0) {
      const users = rooms.docs[0].data().users;
      users.push(userId);
      const roomRef = doc(db, "rooms", rooms.docs[0].id);
      await updateDoc(roomRef, {
        users: users,
        userSize: rooms.docs[0].data().userSize + 1,
      });
      console.log("Added to " + rooms.docs[0].data().name);
    } else {
      const newRoomRef = await addDoc(collection(db, "rooms"), {
        name: "Room 3",
        users: [userId],
        userSize: 1,
      });

      console.log(`Created new room: ${newRoomRef.id}`);
      return newRoomRef.id;
    }
  }

  return (
    <div>
      <SignIn user={user} />
      <button onClick={() => findOrCreateRoom(user.uid)}>
        Find or create room
      </button>
      {/* <ChatBox /> */}
    </div>
  );
}
