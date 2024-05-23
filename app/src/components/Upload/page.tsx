"use client";

import { FormEvent, DragEvent, TouchEvent, useState, useContext } from "react";
import { InputContext } from "@/context/InputValueContext";

import { GripVertical, Upload as UploadIcon } from "lucide-react";

import { Data } from "@/data/data";

export const Upload = () => {
  interface IData {
    id: number;
    word: string;
  }

  interface EventHandler<T extends HTMLElement> {
    (
      event: T extends HTMLLIElement ? DragEvent<HTMLLIElement> : TouchEvent<T>
    ): void;
  }

  const [inputValue, setinputValue] = useState(""); // State to handle the input value
  const [array, setArray] = useState<IData[]>(Data); // State inicialized with the Data used to handle the list of words

  // Function to handle the form submission
  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setinputValue("");

    if (!inputValue) return;
    if (array.find((item) => item.word === inputValue)) return;

    const newWord: IData = { id: array.length, word: inputValue };
    setArray([...array, newWord]);
  }

  /* DRAG AND DROP UNSTABLE */

  // Function to handle when the item is dragged
  const handleDragStart = (index: number) => (e: DragEvent<HTMLLIElement>) => {
    e.dataTransfer.setData("index", index.toString());
  };

  // Function to handle when the item is dragged over
  const handleDragOver = () => (e: DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  // Function to handle when the item is dropped
  const handleDrop = (index: number) => (e: DragEvent<HTMLLIElement>) => {
    const draggedIndex = Number(e.dataTransfer.getData("index"));
    const newItems = [...array];
    const movedItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);

    newItems.splice(index, 0, movedItem);
    setArray(newItems);
  };

  const { input } = useContext(InputContext); // Destructure the input from the context

  const filtedInput = array.filter((item) => item.word.includes(input)); // Filter the array based on the input value

  return (
    <>
      <section className="flex flex-col bg-white py-4 px-2 rounded-xl w-72 md:w-96">
        <form
          className="flex gap-1.5 justify-center px-10"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Cadastre sua palavra"
            className="bg-gray-300 w-40 py-1.5 px-3 text-xs md:text-lg rounded-md sm:w-full"
            value={inputValue}
            onChange={(e) => setinputValue(e.target.value)}
          />
          <button
            type="submit"
            className="bg-black text-xs text-white p-2 rounded-2xl"
          >
            <UploadIcon />
          </button>
        </form>
        <ul className="text-black mt-2 px-6 text-xs md:text-lg">
          {input.length > 0
            ? filtedInput.map((item) => {
                return (
                  <li
                    key={item.id}
                    className="relative flex items-center border border-solid rounded-2xl m-3 py-2 px-2 justify-center"
                    draggable
                    onDragStart={(e: DragEvent<HTMLLIElement>) =>
                      handleDragStart(item.id)(e)
                    }
                    onDragOver={(e: DragEvent<HTMLLIElement>) =>
                      handleDragOver()
                    }
                    onDrop={(e: DragEvent<HTMLLIElement>) =>
                      handleDrop(item.id)(e)
                    }
                    onTouchStart={(e: TouchEvent<HTMLLIElement>) =>
                      handleDragStart(item.id)(e)
                    }
                    onTouchMove={(e: TouchEvent<HTMLLIElement>) =>
                      handleDragOver()
                    }
                    onTouchEnd={(e: TouchEvent<HTMLLIElement>) =>
                      handleDrop(item.id)(e)
                    }
                  >
                    <span className="absolute left-2">
                      <GripVertical size={18} />
                    </span>
                    {item.word}
                  </li>
                );
              })
            : array.map((item) => {
                return (
                  <li
                    key={item.id}
                    className="relative flex items-center border border-solid rounded-2xl m-3 py-2 px-2 justify-center"
                    draggable
                    onDragStart={handleDragStart(item.id)}
                    onDragOver={handleDragOver()}
                    onDrop={handleDrop(item.id)}
                  >
                    <span className="absolute left-2">
                      <GripVertical size={18} />
                    </span>
                    {item.word}
                  </li>
                );
              })}
        </ul>
      </section>
      {/* Handle item */}
    </>
  );
};
