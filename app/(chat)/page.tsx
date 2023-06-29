"use client";
import * as Avatar from "@radix-ui/react-avatar";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(duration);
dayjs.extend(relativeTime);

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
        <Avatar.Image className="object-cover" src={faker.image.avatar()} />
      </Avatar.Root>
      <div className="flex flex-col gap-1 items-start group-data-[is-self=true]:items-end ">
        {faker.helpers.multiple(faker.lorem.paragraph).map((text, index) => {
          return (
            <div
              key={index}
              className="bg-white p-2 first-of-type:rounded-t-md rounded-sm last-of-type:rounded-b-md group-data-[is-self=true]:bg-slate-300 flex flex-col"
            >
              <p>{text}</p>
              <div className="ml-auto w-fit text-sm text-slate-500">
                {dayjs
                  .duration(
                    faker.number.int({ min: 1, max: 10 }),
                    faker.helpers.arrayElement(["seconds", "minutes", "hours"])
                  )
                  .humanize()}
              </div>
            </div>
          );
        })}
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
          <Avatar.Image className="object-cover" src={faker.image.avatar()} />
        </Avatar.Root>
        <div className="truncate text-white font-bold text-xl">
          {faker.company.name()}
        </div>
      </div>
      <div className="flex-1 align-bottom w-full overflow-auto flex flex-col gap-10 p-3">
        {faker.helpers
          .multiple(() => faker.helpers.arrayElement([true, false]), {
            count: 20,
          })
          .map((isSelf, index) => {
            return <Message isSelf={isSelf} key={index} />;
          })}
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
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
