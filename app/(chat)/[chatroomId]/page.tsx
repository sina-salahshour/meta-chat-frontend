"use client";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/lib/components/ui/avatar";
import { Separator } from "@/lib/components/ui/separator";
import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import {
  chatroomsState,
  socketState,
  userState,
} from "@/lib/stores/socket.store";
import { useSnapshot } from "valtio";
import { useRouter } from "next/navigation";
import { DeepReadonly } from "@/lib/types/helpers/deep-readonly";
import { Message } from "@schemas/chat/message.schema";
import { sendMessageSchema } from "@schemas/chat";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/lib/components/ui/form";
dayjs.extend(duration);
dayjs.extend(relativeTime);

interface MessageProps {
  messageInfo: Array<DeepReadonly<Message>>;
}
function Message({ messageInfo }: MessageProps) {
  const userSnaphsot = useSnapshot(userState);
  const [{ value, from, date }] = messageInfo;
  const isSelf = from.id === userSnaphsot.id;
  return (
    <div
      className="flex max-w-xl data-[is-self=true]:ml-auto data-[is-self=true]:flex-row-reverse gap-2 group"
      data-is-self={isSelf}
    >
      <Avatar className="sticky top-0 flex-shrink-0 w-12 h-12">
        <AvatarFallback className="uppercase text-foreground">
          {from.name.slice(0, 2)}
        </AvatarFallback>
        <AvatarImage className="object-cover" src={faker.image.avatar()} />
      </Avatar>
      <div className="flex flex-col gap-1 items-start group-data-[is-self=true]:items-end">
        {messageInfo.map(({ value, date }, index) => {
          return (
            <div
              key={value + index}
              className="p-2 first-of-type:rounded-t-md rounded-sm last-of-type:rounded-b-md group-data-[is-self=true]:bg-primary group-data-[is-self=true]:text-primary-foreground bg-secondary flex flex-col text-secondary-foreground"
            >
              <p>{value}</p>
              <div className="ml-auto w-fit text-sm text-muted-foreground">
                {dayjs(date).fromNow(true)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const messageFormSchema = z.object({
  message: z.string().nonempty(),
});

export interface ChatroomProps {
  params: { chatroomId: string };
}

export default function Chatroom({ params: { chatroomId } }: ChatroomProps) {
  const router = useRouter();
  const chatroomsSnapshot = useSnapshot(chatroomsState);
  const socketSnapshot = useSnapshot(socketState);
  const chatroom = chatroomsSnapshot.chatrooms.find(
    (room) => room.id === chatroomId
  );
  const form = useForm<z.infer<typeof messageFormSchema>>({
    resolver: zodResolver(messageFormSchema),
  });
  if (!socketSnapshot.socket.current) return;
  if (!chatroom) return router.replace("/");
  let messages: Array<Array<Message>> = [];
  let lastMessage: Message | undefined;
  for (let targetMessage of chatroom.messages) {
    if (lastMessage?.from.id === targetMessage.from.id) {
      messages.at(-1)?.unshift(targetMessage);
    } else {
      messages.push([targetMessage]);
    }
    lastMessage = targetMessage;
  }
  socketState.socket.current.emit("chatroom/join", { id: chatroomId });
  return (
    <div className="w-full h-screen flex flex-col bg-primary-foreground">
      <div className="h-16 w-full bg-primary-foreground flex gap-4 items-center p-3">
        <Avatar className="sticky top-0 flex-shrink-0 w-10 h-10">
          <AvatarFallback>Gn</AvatarFallback>
          <AvatarImage className="object-cover" src={faker.image.avatar()} />
        </Avatar>
        <div className="truncate text-white font-bold text-xl">
          {chatroom.name}
        </div>
      </div>
      <Separator orientation="horizontal" />
      <div className="flex-1 align-bottom w-full overflow-auto flex flex-col-reverse gap-10 p-3 mt-auto">
        {messages.map((message, index) => {
          return <Message messageInfo={message} key={index} />;
        })}
      </div>
      <Separator orientation="horizontal" />
      <Form {...form}>
        <form
          autoComplete="off"
          onSubmit={form.handleSubmit(({ message }) => {
            socketState.socket?.current.emit("message/send", {
              message: {
                date: new Date(),
                value: message,
              },
              room: chatroomId,
            } satisfies z.infer<typeof sendMessageSchema>);
            form.reset();
          })}
        >
          <div className="h-20 w-full flex">
            <Input
              type="text"
              className="h-full rounded-none p-5 border-none"
              {...form.register("message")}
            />
            <Separator orientation="vertical" />
            <Button type="submit" className="h-full aspect-square rounded-none">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.20308 1.04312C1.00481 0.954998 0.772341 1.0048 0.627577 1.16641C0.482813 1.32802 0.458794 1.56455 0.568117 1.75196L3.92115 7.50002L0.568117 13.2481C0.458794 13.4355 0.482813 13.672 0.627577 13.8336C0.772341 13.9952 1.00481 14.045 1.20308 13.9569L14.7031 7.95693C14.8836 7.87668 15 7.69762 15 7.50002C15 7.30243 14.8836 7.12337 14.7031 7.04312L1.20308 1.04312ZM4.84553 7.10002L2.21234 2.586L13.2689 7.50002L2.21234 12.414L4.84552 7.90002H9C9.22092 7.90002 9.4 7.72094 9.4 7.50002C9.4 7.27911 9.22092 7.10002 9 7.10002H4.84553Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
