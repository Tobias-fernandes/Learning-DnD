'use client'

import { useState } from "react";

import { GripVertical as GripVerticalIcon } from "lucide-react";

export const Reorder = () => {

  interface IData {
    id: number,
    word: string,
  }

  const [array, setArray] = useState<IData[]>([]);

  function handleDrop () {

  }

    return (
        <>
          <div className="flex flex-col bg-white px-8 rounded-xl w-72">

            <ul 
              className="text-black text-xs h-72 overflow-auto md:text-lg"
              onDrop={handleDrop}
              >

              {array.length === 0 ? (
                <li className="text-center mt-5">Lista Vazia!<br />Drope algo aqui</li>
              ) : (
                array.map((item) => {
                  return (
                    <li
                      key={item.id}                   
                      className="relative flex items-center border border-solid rounded-2xl m-3 py-2 px-2 justify-center"
                      draggable
                      
                      > <span className="absolute left-2"> <GripVerticalIcon size={18} /> </span> {item.word} </li>
                  )
                })
              )}

            </ul>
          </div> {/* Passar Item */}
        </>
    );
}