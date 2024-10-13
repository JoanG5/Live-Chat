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

  console.log(user);

  async function findOrCreateRoom(userId) {
    const roomsRef = collection(db, "rooms");

    const availableRoomsQuery = query(
      roomsRef,
      where("users", "<", 2),
      limit(1)
    );

    const availableRoomsSnapshot = await getDocs(availableRoomsQuery);

    if (availableRoomsSnapshot.empty) {
      const newRoomRef = await addDoc(roomsRef, {
        users: [userId],
      });

      console.log(`Created new room: ${newRoomRef.id}`);
      return newRoomRef.id;
    } else {
      const room = availableRoomsSnapshot.docs[0];
      const roomData = room.data();

      await updateDoc(doc(db, "rooms", room.id), {
        users: [...roomData.users, userId],
      });

      console.log(`User added to room: ${room.id}`);
      return room.id;
    }
  }

  return (
    <div>
      <SignIn 
        user={user}
      />
      <button onClick={() => findOrCreateRoom("user2")}>
        Find or create room
      </button>
      {/* <ChatBox /> */}
    </div>
  );
}
