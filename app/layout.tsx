"use client";
import { useSnapshot } from "valtio";
import "./globals.css";
import {
  chatroomsState,
  socketState,
  userState,
} from "@/lib/stores/socket.store";
import { useEffect } from "react";
import { SOCKET_CONFIG } from "@/lib/constants";
import { io } from "socket.io-client";
import { Chatroom } from "@schemas/chat/chatroom.schema";
import { z } from "zod";
import { getMessagesSchema } from "@schemas/chat";
import { Message } from "@schemas/chat/message.schema";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const socketSnapshot = useSnapshot(socketState);
  useEffect(() => {
    if (!socketSnapshot.socket.current) {
      {
        const socket = io("http://localhost:4000", SOCKET_CONFIG);
        socket.emit(
          "register",
          {
            name: "sina",
          },
          ({ id }: { id: string }) => {
            userState.id = id;
          }
        );
        socket.emit("chatroom", null, (rooms: Array<Chatroom>) => {
          chatroomsState.chatrooms = rooms;
        });
        socket.on(
          "message",
          ({ room: roomId, message }: { room: string; message: Message }) => {
            const room = chatroomsState.chatrooms.find(
              (target) => target.id === roomId
            );
            if (!room) return;
            room.messages.unshift(message);
          }
        );
        socketState.socket.current = socket;
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
