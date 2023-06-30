"use client";

import { faker } from "@faker-js/faker";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/lib/components/ui/avatar";
import { Separator } from "@/lib/components/ui/separator";
import { Button } from "@/lib/components/ui/button";

function ChatItem() {
  return (
    <div className="cursor-pointer group room bg-zinc-950 flex items-center justify-start p-2 gap-3 hover:bg-zinc-900 active:bg-zinc-800 transition-colors">
      <Avatar className="flex-shrink-0 w-12 h-12">
        <AvatarFallback>Gn</AvatarFallback>
        <AvatarImage className="object-cover" src={faker.image.avatar()} />
      </Avatar>
      <div className="flex flex-col overflow-hidden text-ellipsis justify-start gap-1 h-full">
        <div className="truncate text-white font-bold">
          {faker.company.name()}
        </div>
        <div className="truncate text-xs text-zinc-500">
          <span className="text-zinc-200">{faker.person.firstName()}: </span>
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
      <div className="flex flex-col w-80 bg-zinc-950 min-h-[100dvh]">
        <div className="w-full text-2xl font-bold text-zinc-500 bg-zinc-900 flex">
          <div className="p-4">Chatter</div>
          <Separator orientation="vertical" className="ml-auto bg-zinc-950" />
          <Button
            variant="ghost"
            className="h-full aspect-square text-xl rounded-none"
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </Button>
        </div>
        <div className="flex flex-col">
          <Separator orientation="horizontal" className="bg-zinc-950" />
          <ChatItem />
          <Separator
            orientation="horizontal"
            className="bg-zinc-200 bg-opacity-5"
          />
          <ChatItem />
          <Separator
            orientation="horizontal"
            className="bg-zinc-200 bg-opacity-5"
          />
          <ChatItem />
          <Separator
            orientation="horizontal"
            className="bg-zinc-200 bg-opacity-5"
          />
          <ChatItem />
          <Separator
            orientation="horizontal"
            className="bg-zinc-200 bg-opacity-5"
          />
          <ChatItem />
          <Separator
            orientation="horizontal"
            className="bg-zinc-200 bg-opacity-5"
          />
        </div>
      </div>
      <Separator orientation="vertical" className="bg-zinc-950" />
      {children}
    </div>
  );
}
