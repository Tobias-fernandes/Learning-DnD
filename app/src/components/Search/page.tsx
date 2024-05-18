"use client"

import { Search as SearchIcon } from "lucide-react";

import { useState } from "react";

import { InputTextContext } from "@/app/page";

export const Search = () => {

  const [search, setSearch] = useState<string>("");

  console.log(search); {/* Teste */}

    return (
        <>
          <InputTextContext.Consumer>
            {inputText=>(
            <div className="flex flex-col bg-white py-4 px-2 rounded-xl">
              <form className="flex gap-1.5 justify-center px-10 md:px-28">
              <input 
                type="text" 
                placeholder="Pesquise sua palavra" 
                className="bg-gray-300 w-40 md:w-[405px] py-1.5 px-3 text-xs md:text-lg rounded-md sm:w-full"
                value={inputText}
                onChange={e => setSearch(e.target.value)}  
              />  
              
              <button type="submit" className="bg-black text-xs text-white p-2 rounded-2xl">
                <SearchIcon />
              </button>
              </form>  
            </div> 
            )}
          </InputTextContext.Consumer>
        </>
    )
}