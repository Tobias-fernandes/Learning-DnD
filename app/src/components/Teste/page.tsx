// export const MyComponent = () => {
//     const [isDragging, setIsDragging] = useState(false);

//     const handleMouseDown = () => {
//         setIsDragging(true);
//     };

//     const handleMouseUp = () => {
//         setIsDragging(false);
//     };

//     const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//         if (isDragging) {
//             const target = e.currentTarget;
//             target.style.opacity = '0.6';
//             target.style.transform = 'scale(0.95)';
//         }
//     };

//     return (
//         <div
//             draggable={}
//             onMouseDown={handleMouseDown}
//             onMouseUp={handleMouseUp}
//             onMouseMove={handleMouseMove}
//             style={{
//                 width: '100px',
//                 height: '100px',
//                 backgroundColor: 'blue',
//                 cursor: isDragging ? 'grabbing' : 'grab',
//                 transition: 'transform 0.2s, opacity 0.2s',
//             }}
//         >
//             Drag me!
//         </div>
//     );
// };

///////////////////////////////////////////////////////////////////////////////////////////////////////

// "use client"

// import { useState } from "react"

// import { GripVertical, Upload as UploadIcon } from "lucide-react";

// import { Data } from "../../data/data";

// export const MyComponent = () => {

//     const [drag, setDrag] = useState<boolean>(false);

//     function handleMouseDown() {
//         setDrag(true);
//     }
    
//     function handleMouseUp() {
//       if(!drag) {
//         setDrag(false);
//       }
//     }

//     return (
//         <>
//           <div className="flex flex-col bg-white py-4 px-2 rounded-xl w-72 md:w-96">
//             <ul className="text-black mt-2 px-6 text-xs md:text-lg">

//               {Data.map((item) => {
//                 return (
//                   <li 
//                     key={item.id} 
//                     className="relative flex items-center border border-solid rounded-2xl m-3 py-2 px-2 justify-center"
//                     draggable={drag}
//                     onMouseDown={handleMouseDown}
//                     onMouseUp={handleMouseUp}
//                     > <span className="absolute left-2"> <GripVertical size={18} /> </span> {item.word} </li>
//                 )
//               })}

//             </ul>
//           </div> {/* Manusear Item */}
//         </>
//     );
// }

"use client"

import React, { useState } from 'react';

import { GripVertical } from "lucide-react";

import { Data } from "../../data/data";

export const MyComponent = () => {

    interface IData {
        id: number,
        word: string,
      }


    const [items, setItems] = useState<IData[]>(Data);

    const handleDragStart = (index: number) => (event: React.DragEvent<HTMLUListElement>) => {
        event.dataTransfer.setData('index', index.toString());
    };

    const handleDragOver = () => (event: React.DragEvent<HTMLUListElement>) => {
        event.preventDefault();
    };

    const handleDrop = (index: number) => (event: React.DragEvent<HTMLUListElement>) => {
        const draggedIndex = Number(event.dataTransfer.getData('index'));
        const newItems = [...items];
        const movedItem = newItems[draggedIndex];
        newItems.splice(draggedIndex, 1);
        newItems.splice(index, 0, movedItem);
        setItems(newItems);
    };

    return (
        <div>
            <h2>Itens</h2>
            <div>
                {items.map((item, index) => (
                    <ul
                        key={index}
                        draggable
                        onDragStart={handleDragStart(index)}
                        onDragOver={handleDragOver()}
                        onDrop={handleDrop(index)}
                    >
                       <li key={item.id} className="relative flex items-center border border-solid rounded-2xl m-3 py-2 px-2 justify-center w-44"> <span className="absolute left-2"> <GripVertical size={18} /> </span> {item.word} </li>
                    </ul>
                ))}
            </div>
        </div>
    );
};
