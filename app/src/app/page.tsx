import { Header } from "../components/Header/page";

import { Search } from "../components/Search/page";
import { Upload } from "../components/Upload/page";
import { Reorder } from "../components/Reorder/page";

import {createContext, Provider, useContext } from "react";

// import { MyComponent } from "../components/Teste/page"
export const InputTextContext = createContext("");

export default function Home() {

  const textoDigitado  = useContext(InputTextContext);

  return (
    <>
      <Header />
      <InputTextContext.Provider value={textoDigitado}>
        <main className="mt-5 md:mt-16 flex flex-col gap-5 px-4 items-center">

          <Search />
          <div className="flex flex-col gap-4 md:flex-row md:justify-between">
            <Upload />
            <Reorder />
          </div>
          {/* <MyComponent /> */}
        </main>
      </InputTextContext.Provider>

      <footer className="text-center text-xs md:text-base">
        <p>&copy; Tobias Fernandes | Todos os direitos reservados.</p>
      </footer> 
    </>

  );
}