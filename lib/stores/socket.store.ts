import { Socket } from "socket.io-client";
import { proxy } from "valtio";
import type { Chatroom } from "@schemas/chat/chatroom.schema";

export const socketState = proxy<{ socket: Socket | null }>({ socket: null });
export const chatroomsState = proxy<{ chatrooms: Array<Chatroom> }>({
  chatrooms: [],
});
