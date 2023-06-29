"use client";

import { MutableRefObject, useMemo, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

const socket_config = {
  transports: ["websocket", "polling"],
};
function handleConnect(socketRef: MutableRefObject<Socket | undefined>): void {
  const socket = (socketRef.current = io(
    "http://localhost:4000",
    socket_config
  ));
  socket.on("connect", function () {
    console.log("Connected");
  });
  socket.onAny((event, data) => {
    if (["exception", "disconnect", "connect"].includes(event)) return;
    try {
      console.log(event, JSON.parse(data));
    } catch (err) {
      console.error(event, data);
    }
  });
  socket.on("exception", function (data) {
    console.log("exception", data);
  });
  socket.on("disconnect", function () {
    console.log("Disconnected");
  });
}
export default function Home() {
  const socketRef = useRef<Socket>();
  function withSocket(cb: (socket: Socket) => void) {
    return () => {
      const socket = socketRef.current;
      if (!socket) return;
      cb(socket);
    };
  }
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => handleConnect(socketRef)}>connect</button>
      <button
        onClick={withSocket((socket) => {
          socket.emit("chatroom", (val: string) => console.log(val));
        })}
      >
        chatrooms
      </button>
      <button
        onClick={withSocket((socket) => {
          socket.emit("chatroom/create", { name: value });
        })}
      >
        create chatroom
      </button>
      <button
        onClick={withSocket((socket) => {
          socket.emit("chatroom/join", value);
        })}
      >
        join chatroom
      </button>
    </div>
  );
}
