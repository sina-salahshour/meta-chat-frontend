"use client";
import * as Avatar from "@radix-ui/react-avatar";

interface MessageProps {
  isSelf: boolean;
}
function Message({ isSelf }: MessageProps) {
  return (
    <div
      className="flex max-w-xl data-[is-self=true]:ml-auto data-[is-self=true]:flex-row-reverse gap-2 group"
      data-is-self={isSelf}
    >
      <Avatar.Root className="sticky top-0 flex-shrink-0 w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
        <Avatar.Fallback>Gn</Avatar.Fallback>
        <Avatar.Image
          className="object-cover"
          src="data:image/jpeg;base64,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"
        />
      </Avatar.Root>
      <div className="flex flex-col gap-1 items-start group-data-[is-self=true]:items-end ">
        <div className="bg-white p-2 first-of-type:rounded-t-md rounded-sm last-of-type:rounded-b-md group-data-[is-self=true]:bg-slate-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore a ipsa
          sapiente neque autem, tempore minima modi ea eligendi laborum.
        </div>
        <div className="bg-white p-2 first-of-type:rounded-t-md rounded-sm last-of-type:rounded-b-md w-fit group-data-[is-self=true]:bg-slate-300">
          Lorem
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col bg-slate-800">
      <div className="h-16 w-full bg-slate-900 flex gap-4 border-l-2 border-slate-950 items-center p-3">
        <Avatar.Root className="sticky top-0 flex-shrink-0 w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
          <Avatar.Fallback>Gn</Avatar.Fallback>
          <Avatar.Image
            className="object-cover"
            src="data:image/jpeg;base64,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"
          />
        </Avatar.Root>
        <div className="truncate text-white font-bold text-xl">Group name</div>
      </div>
      <div className="flex-1 align-bottom w-full overflow-auto flex flex-col gap-2 p-3">
        <Message isSelf={true} />
        <Message isSelf={false} />
        <Message isSelf={false} />
        <Message isSelf={true} />
        <Message isSelf={false} />
        <Message isSelf={false} />
        <Message isSelf={false} />
        <Message isSelf={false} />
      </div>
      <div className="h-20 w-full bg-slate-700 flex gap-4">
        <input
          type="text"
          className="h-full flex-1 outline-none bg-transparent text-white p-4"
        />
        <button className="text-white h-full bg-slate-600 flex justify-center items-center aspect-square">
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
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
