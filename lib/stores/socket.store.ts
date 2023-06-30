import { Socket } from "socket.io-client";
import { proxy, ref } from "valtio";
import type { Chatroom } from "@schemas/chat/chatroom.schema";

export const socketState = proxy<{ socket: { current: Socket } }>({
  socket: ref({ current: null as any }),
});
export const chatroomsState = proxy<{ chatrooms: Array<Chatroom> }>({
  chatrooms: [],
});
export const userState = proxy<{ id: string }>({ id: "" });
