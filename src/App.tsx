import pokemonLogo from "./assets/pokemon-logo.png";
import pokemonImageBg from "./assets/pokemon-bg-image.jpg";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <section className="h-screen w-screen bg-cover bg-center relative flex justify-center items-center">
      {/* background logo for home view */}
      <img
        src={pokemonImageBg}
        alt="noise-image"
        className="absolute inset-0 bg-transparent h-screen w-screen"
      />
      {/* content for home view */}
      <div className="absolute text-center">
        {/* logo */}
        <img
          src={pokemonLogo}
          alt="pokemon logo"
          className="w-[300px] h-[200px] mx-auto"
        />
        {/* title */}
        <h2 className="text-4xl lg:text-5xl font-semibold font-title tracking-tight py-3">
          Poké <span className="text-pink-500">book</span>
        </h2>
        {/* description */}
        <p className="mx-auto w-[370px] text-black font-description font-normal text-lg">
          Largest Pokémon index with information about every Pokemon you can
          think of.{" "}
        </p>
        {/* search bar */}
        <div className="flex justify-between border-2 rounded-[30px] py-2 bg-white pr-[9px] pl-[20px] mt-16 border-[#DE527F] w-[340px] lg:w-[536px] mx-auto">
          <input
            type="text"
            placeholder="Enter pokemon name"
            className="font-description text-lg text-[#7B7B7B] flex-grow bg-transparent focus:outline-none"
          />
          <div className="bg-[#DE527F] p-[14px] rounded-full gap-2">
            <Search className="text-white" />
          </div>
        </div>

        {/* view all */}
        <p className=" underline font-description font-semibold text-black pt-6 cursor-pointer">
          view all
        </p>
      </div>
    </section>
  );
}
