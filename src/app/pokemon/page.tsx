"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface PokemonResult {
  name: string;
  url: string;
  imageUrl?: string; // Add this to include the image URL
}

interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonResult[];
}

interface PokemonDetail {
  name: string;
  sprites: {
    front_default: string;
  };
}

export default function Page() {
  const [pokemons, setPokemons] = useState<PokemonResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const limit = 50;

  const fetchPokemons = async (page: number) => {
    const offset = (page - 1) * limit;

    try {
      const response = await axios.get<PokemonResponse>(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      setPokemons(response.data);

      setTotalPages(Math.ceil(response.data.count / limit));

      // Fetch additional details for each Pokémon
      const pokemonDetailsPromises = response.data.results.map(async (pokemon) => {
        const detailsResponse = await axios.get<PokemonDetail>(pokemon.url);
        return { ...pokemon, imageUrl: detailsResponse.data.sprites.front_default };
      });

      const detailedPokemons = await Promise.all(pokemonDetailsPromises);
      setPokemons((prev) => (prev ? { ...prev, results: detailedPokemons } : null));

    } catch (err) {
      console.error("Error fetching Pokémon:", err);
      setError("Failed to fetch Pokémon data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons(page);
  }, [page]);

  if (loading) return <p className="container mx-auto mt-10">Loading...</p>;
  if (error) return <p className="container mx-auto mt-10">{error}</p>;

  if (!pokemons) return <p>No Pokémon data available</p>;

  return (
    <div className="flex justify-center items-center min-h-screen ">
    <div className="max-w-5xl w-full">
      <h1 className="mt-10 mb-3 text-3xl font-bold text-center">Pokémon List</h1>
      <ul className="flex flex-col gap-4">
        {pokemons.results.map((pokemon) => (
          <li key={pokemon.name}>
            <div className="p-6 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-center gap-2">
              {pokemon.imageUrl && (
                <img
                  src={pokemon.imageUrl}
                  alt={pokemon.name}
                  className="w-12 h-12 object-contain"
                />
              )}
              <Link
                href={`pokemon/${pokemon.name}`}
                className="text-blue-500 hover:underline"
                aria-label={`View details of ${pokemon.name}`}
              >
                {pokemon.name}
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="btn btn-success"
        >
          Previous
        </button>
        <span className="self-center">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="btn btn-success"
        >
          Next
        </button>
      </div>
    </div>
  </div>
  )
}
