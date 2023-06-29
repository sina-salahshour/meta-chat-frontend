"use client";

import { faker } from "@faker-js/faker";
import * as Avatar from "@radix-ui/react-avatar";

function ChatItem() {
  return (
    <div className="cursor-pointer group room bg-slate-900 rounded-md m-1 flex items-center justify-start p-2 gap-3 hover:bg-slate-800 active:bg-slate-700">
      <Avatar.Root className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
        <Avatar.Fallback>Gn</Avatar.Fallback>
        <Avatar.Image className="object-cover" src={faker.image.avatar()} />
      </Avatar.Root>
      <div className="flex flex-col overflow-hidden text-ellipsis justify-start gap-1 h-full">
        <div className="truncate text-white font-bold">
          {faker.company.name()}
        </div>
        <div className="truncate text-xs text-slate-500">
          <span className="text-slate-200">{faker.person.firstName()}: </span>
          {faker.lorem.sentences()}
        </div>
      </div>
    </div>
  );
}

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  faker.seed(24);
  return (
    <div className="flex">
      <div className="flex flex-col w-80 bg-slate-950 min-h-[100dvh]">
        <div className="w-full p-4 text-2xl font-bold text-slate-500 bg-slate-900">
          Chatter
        </div>
        <div className="flex flex-col gap-1 p-1 mt-1">
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
        </div>
      </div>
      {children}
    </div>
  );
}
