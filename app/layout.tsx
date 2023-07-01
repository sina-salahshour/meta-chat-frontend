"use client";
import { useSnapshot } from "valtio";
import "./globals.css";
import {
  chatroomsState,
  socketState,
  userState,
} from "@/lib/stores/socket.store";
import { useEffect, useRef, useState } from "react";
import { SOCKET_CONFIG } from "@/lib/constants";
import { io } from "socket.io-client";
import { Chatroom } from "@schemas/chat/chatroom.schema";
import { Message } from "@schemas/chat/message.schema";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/components/ui/dialog";
import { Button } from "@/lib/components/ui/button";
import { Label } from "@/lib/components/ui/label";
import { Input } from "@/lib/components/ui/input";
import { registerMemberSchema } from "@schemas/chat/member.schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/lib/components/ui/form";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const socketSnapshot = useSnapshot(socketState);
  const promiseRef = useRef<Function>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof registerMemberSchema>>({
    resolver: zodResolver(registerMemberSchema),
  });

  useEffect(() => {
    (async () => {
      if (!socketSnapshot.socket.current) {
        {
          const socket = io("http://localhost:4000", SOCKET_CONFIG);
          const username: string = await new Promise((resolve) => {
            promiseRef.current = resolve;
            setIsDialogOpen(true);
          });
          socket.emit(
            "register",
            {
              name: username,
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
    })();
  }, [socketSnapshot]);
  return (
    <html lang="en">
      <body className="dark">
        <Dialog open={isDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(({ name }) => {
                  setIsDialogOpen(false);
                  promiseRef.current?.(name);
                })}
              >
                <DialogHeader>
                  <DialogTitle>Register</DialogTitle>
                  <DialogDescription>Enter your desired name</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      className="col-span-3"
                      {...form.register("name")}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">register</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        {children}
      </body>
    </html>
  );
}
