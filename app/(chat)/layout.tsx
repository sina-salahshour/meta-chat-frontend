"use client";

import * as Avatar from "@radix-ui/react-avatar";

function ChatItem() {
  return (
    <div className="cursor-pointer group room bg-slate-900 rounded-md m-1 flex items-center justify-start p-2 gap-3 hover:bg-slate-800 active:bg-slate-700">
      <Avatar.Root className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
        <Avatar.Fallback>Gn</Avatar.Fallback>
        <Avatar.Image
          className="object-cover"
          src="data:image/jpeg;base64,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"
        />
      </Avatar.Root>
      <div className="flex flex-col overflow-hidden text-ellipsis justify-start gap-1 h-full">
        <div className="truncate text-white font-bold">Group name</div>
        <div className="truncate text-xs text-slate-500">
          <span className="text-slate-200">You: </span>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores,
          blanditiis? Deserunt in minima optio sunt vel accusantium nobis
          nesciunt. Rerum.
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
