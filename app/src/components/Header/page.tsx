import { Moon as MoonIcon } from "lucide-react";

export const Header = () => {
    return (
        <>
          <header className="flex justify-between p-5 bg-black text-white items-center">
            <div className="md:text-2xl">WordQuest</div>

            <div>
              <button>
                <MoonIcon />
              </button>
            </div>
      </header>
        </>
    )
}