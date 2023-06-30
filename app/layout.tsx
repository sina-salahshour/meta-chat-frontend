"use client";
import { useSnapshot } from "valtio";
import "./globals.css";
import { chatroomsState, socketState } from "@/lib/stores/socket.store";
import { useEffect } from "react";
import { SOCKET_CONFIG } from "@/lib/constants";
import { io } from "socket.io-client";
import { Chatroom } from "@schemas/chat/chatroom.schema";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const socketSnapshot = useSnapshot(socketState);
  useEffect(() => {
    if (!socketSnapshot.socket) {
      {
        const socket = io("http://localhost:4000", SOCKET_CONFIG);
        socket.emit("chatroom", null, (rooms: Array<Chatroom>) => {
          chatroomsState.chatrooms = rooms;
        });
        socketState.socket = socket;
        console.log("connected");
      }
    }
  }, [socketSnapshot]);
  return (
    <html lang="en">
      <body className="dark">{children}</body>
    </html>
  );
}
