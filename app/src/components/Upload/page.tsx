"use client"

import { FormEvent, useState, DragEvent } from "react"

import { GripVertical, Upload as UploadIcon } from "lucide-react";

import { Data } from "../../data/data";

export const Upload = () => {

  interface IData {
    id: number,
    word: string,
  }
  
  const [update, setUpdate] = useState("");  //state para pegar o texto do input
  const [array, setArray] = useState<IData[]>(Data) //state para pegar os nomes na db
  
  console.log(array);

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setUpdate("");

    if(!update) return;
    if(array.find(item => item.word === update)) return;
    
    const newWord: IData = {id: array.length, word: update}
    setArray([...array, newWord]);
  }

  /* */

  const handleDragStart = (index: number) => (e: DragEvent<HTMLLIElement>) => {
    e.dataTransfer.setData('index', index.toString());
  };

  const handleDragOver = () => (e: DragEvent<HTMLLIElement>) => {
      e.preventDefault();
  };

  const handleDrop = (index: number) => (e: DragEvent<HTMLLIElement>) => {
      const draggedIndex = Number(e.dataTransfer.getData('index'));
      const newItems = [...array];
      const movedItem = newItems[draggedIndex];
      newItems.splice(draggedIndex, 1);
      
      newItems.splice(index, 0, movedItem);
      setArray(newItems);
  };

    return (
      <>
        <div className="flex flex-col bg-white py-4 px-2 rounded-xl w-72 md:w-96">
          <form className="flex gap-1.5 justify-center px-10" onSubmit={handleSubmit}>
            <input 
              type="text"
              placeholder="Cadastre sua palavra" 
              className="bg-gray-300 w-40 py-1.5 px-3 text-xs md:text-lg rounded-md sm:w-full"
              value={update}
              onChange={e => setUpdate(e.target.value)}
            />  
            <button
              type="submit"
              className="bg-black text-xs text-white p-2 rounded-2xl"               
            >
              <UploadIcon />
            </button>
          </form> 
          <ul 
            className="text-black mt-2 px-6 text-xs h-72 overflow-auto md:text-lg">
              {array.map((item) => {
                return (
                  <li 
                    key={item.id} 
                    className="relative flex items-center border border-solid rounded-2xl m-3 py-2 px-2 justify-center"
                    draggable
                    onDragStart={handleDragStart(item.id)}
                    onDragOver={handleDragOver()}
                    onDrop={handleDrop(item.id)}> <span className="absolute left-2"> <GripVertical size={18} /> </span> {item.word} </li>
                )
              })}

          </ul>
        </div> {/* Manusear Item */}
      </>
    );
}
