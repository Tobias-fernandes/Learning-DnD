"use client";

import { useState, useContext } from "react";
import { InputContext } from "@/context/InputValueContext";

import { GripVertical as GripVerticalIcon } from "lucide-react";

export const Reorder = () => {
  interface IData {
    id: number;
    word: string;
  }

  const [array, setArray] = useState<IData[]>([]);
  // usar setArray na FN do handleDrop!!

  function handleDrop() {}

  const { input } = useContext(InputContext);

  const filtedInput =
    input.length > 0
      ? array.filter((item) => item.word.includes(input))
      : array;

  return (
    <>
      <section className="flex flex-col bg-white px-8 rounded-xl w-72">
        <ul className="text-black text-xs md:text-lg" onDrop={handleDrop}>
          {array.length === 0 ? (
            <li className="text-center mt-5">
              Lista Vazia!
              <br />
              Drope algo aqui
            </li>
          ) : (
            filtedInput.map((item) => {
              return (
                <li
                  key={item.id}
                  className="relative flex items-center border border-solid rounded-2xl m-3 py-2 px-2 justify-center"
                  draggable
                >
                  <span className="absolute left-2">
                    <GripVerticalIcon size={18} />
                  </span>
                  {item.word}
                </li>
              );
            })
          )}
        </ul>
      </section>
      {/* Pass item */}
    </>
  );
};
