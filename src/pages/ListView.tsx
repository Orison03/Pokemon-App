import { Link } from "react-router-dom";
import pokemonLogo from "../assets/pokemon-logo.png";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  Loader,
  Search,
} from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "./Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Pokemon {
  name: string;
  url: string;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  height: number;
  weight: number;
  abilities: Ability[];
  stats: Stat[];
}

interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name:
      | "hp"
      | "attack"
      | "defense"
      | "special-attack"
      | "special-defense"
      | "speed";
    url: string;
  };
}

interface PokemonDetails {
  name: string;
  sprites: {
    front_default: string;
  };
}

const ListView: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const { data } = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=100"
        );
        const promises = data.results.map((pokemon: Pokemon) =>
          axios.get<PokemonDetails>(pokemon.url)
        );
        const pokemonDetails = await Promise.all(promises);
        setPokemonList(pokemonDetails.map((detail) => detail.data));
        setFilteredPokemon(pokemonDetails.map((detail) => detail.data));

        console.log(pokemonDetails);
      } catch (error) {
        console.log("Failed to fetch data:", error);
      }
    };

    fetchPokemonData();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      const filtered = searchTerm
        ? pokemonList.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : pokemonList;
      setFilteredPokemon(filtered);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, pokemonList]);

  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);
  const displayedPokemons = filteredPokemon.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newValue: string) => {
    setItemsPerPage(Number(newValue));
    setCurrentPage(1);
  };

  const paginationItems = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <button
            key={i}
            className={`px-4 py-2 m-1 font-medium rounded-[8px] ${
              currentPage === i
                ? "bg-[#E85382] text-white font-medium"
                : "bg-gray-200 font-medium"
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(
          <span key={i} className="px-4 py-2 m-1">
            <Ellipsis />
          </span>
        );
      }
    }
    return pages;
  };

  return (
    <section className="bg-gray-100/45 min-h-screen">
      <nav className="px-2 py-4 md:p-4 flex items-center justify-between shadow-sm w-full h-full">
        <div>
          <Link to="/">
            <div className="flex space-x-3 items-center">
              <img
                src={pokemonLogo}
                alt="pokemon logo"
                className="w-[50px] h-auto lg:h-[60px] lg:w-[80px] bg-cover"
              />
              <h2 className="hidden md:block md:text-lg lg:text-2xl font-semibold font-title tracking-tight py-3">
                Poké <span className="text-[#E85382]">book</span>
              </h2>
            </div>
          </Link>
        </div>
        <div className="flex space-x-3 border shadow-sm rounded-[30px] pl-3 py-3 pr-8 md:pl-[20px] border-[#E1E1E1] w-fit h-auto lg:lg:w-[440px] items-center">
          <div className="lg:w-[24px] lg:h-24px">
            <Search className="text-[#E1E1E1]" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter pokemon name..."
            className="font-description max-sm:text-sm text-lg flex-grow bg-transparent focus:outline-none"
          />
        </div>
        {/* theme component */}
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="w-8 h-8 lg:w-12 lg:h-12 border border-[#868686] rounded-full flex items-center justify-center">
              <div className="w-6 h-6 lg:w-8 lg:h-8 bg-[#E85382] rounded-full"></div>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </nav>

      <div className="pt-24 pb-16 px-10">
        {!filteredPokemon.length ? (
          <div className="flex items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-20 gap-x-5">
            {displayedPokemons.map((pokemon) => (
              <section key={pokemon.name}>
                <Card
                  name={pokemon.name}
                  image={pokemon.sprites.other.dream_world.front_default}
                  height={pokemon.height}
                  weight={pokemon.weight}
                  abilities={pokemon.abilities}
                  stats={pokemon.stats}
                />
              </section>
            ))}
          </div>
        )}
      </div>

      {/* Pagination controls */}
      {filteredPokemon.length && (
        <div className="max-sm:flex-col flex items-center justify-between pb-10 px-5 overflow-auto max-sm:gap-6">
          <div className="flex justify-center p-4">
            <button
              className={`p-2 m-1 rounded-[8px] ${
                currentPage === 1
                  ? "disabled text-black bg-gray-200"
                  : "bg-gray-200"
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft />
            </button>

            {paginationItems()}

            <button
              className={`p-2 m-1 rounded-[8px] ${
                currentPage === totalPages
                  ? "bg-[#E85382] text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight />
            </button>
          </div>
          {/* Dropdown to select items per page */}
          <div>
            <Select
              value={String(itemsPerPage)}
              onValueChange={handleItemsPerPageChange}
            >
              <SelectTrigger className="w-[180px] font-medium">
                <SelectValue placeholder="8" className="font-medium" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"8"} className="font-medium">
                  8
                </SelectItem>
                <SelectItem value={"12"} className="font-medium">
                  12
                </SelectItem>
                <SelectItem value={"16"} className="font-medium">
                  16
                </SelectItem>
                <SelectItem value={"24"} className="font-medium">
                  24
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </section>
  );
};

export default ListView;
