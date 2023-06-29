"use client";

import { faker } from "@faker-js/faker";
import * as Avatar from "@radix-ui/react-avatar";
import * as Separator from "@radix-ui/react-separator";

function ChatItem() {
  return (
    <div className="cursor-pointer group room bg-slate-900 flex items-center justify-start p-2 gap-3 hover:bg-slate-800 active:bg-slate-700">
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
      <div className="flex flex-col w-80 bg-slate-900 min-h-[100dvh]">
        <div className="w-full p-4 text-2xl font-bold text-slate-500 bg-slate-900 flex">
          Chatter
          <button className="ml-auto p-1 hover:bg-slate-950 bg-opacity-5 rounded-sm">
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
          </button>
        </div>
        <div className="flex flex-col">
          <Separator.Root
            orientation="horizontal"
            className="h-0.5 bg-slate-950 rounded-full"
          />
          <ChatItem />
          <Separator.Root
            orientation="horizontal"
            className="h-[1px] bg-slate-200 rounded-full bg-opacity-5"
          />
          <ChatItem />
          <Separator.Root
            orientation="horizontal"
            className="h-[1px] bg-slate-200 rounded-full bg-opacity-5"
          />
          <ChatItem />
          <Separator.Root
            orientation="horizontal"
            className="h-[1px] bg-slate-200 rounded-full bg-opacity-5"
          />
          <ChatItem />
          <Separator.Root
            orientation="horizontal"
            className="h-[1px] bg-slate-200 rounded-full bg-opacity-5"
          />
          <ChatItem />
          <Separator.Root
            orientation="horizontal"
            className="h-[1px] bg-slate-200 rounded-full bg-opacity-5"
          />
        </div>
      </div>
      <Separator.Root
        orientation="vertical"
        className="w-0.5 bg-slate-950 rounded-full"
      />
      {children}
    </div>
  );
}
