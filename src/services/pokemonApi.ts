// Interfaces para tipar los datos
export interface PokemonStats {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
}

export interface PokemonMove {
    name: string;
    category: string;
    power: number;
    type: string;
}

export interface PokemonImages {
    front: string;
    back: string;
    icon: string;
}

export interface PokemonDetails {
    id: number;
    name: string;
    types: string[];
    stats: PokemonStats;
    moves: PokemonMove[];
    images: PokemonImages;
}

export class PokemonAPI {
    static POKEMON_LIMIT = 920;
    static API_URL = "http://localhost:3000/api/pokemon/";

    public static async getRandomPokemon(): Promise<PokemonDetails | null> {
        let validPokemon: PokemonDetails | null = null;

        while (!validPokemon) {
            const randomId = Math.floor(Math.random() * PokemonAPI.POKEMON_LIMIT) + 1;

            try {
                const response = await fetch(`${PokemonAPI.API_URL}${randomId}`);
                if (!response.ok) continue;

                const pokemonDetails = await response.json();

                if (pokemonDetails.moves.length >= 10) {
                    validPokemon = await PokemonAPI.formatPokemonDetails(pokemonDetails);
                    console.log(`Pokémon seleccionado: ${validPokemon.name} ${PokemonAPI.API_URL}${validPokemon.id}`);
                } else {
                    console.log(`Descartado: ${pokemonDetails.name} (tiene ${pokemonDetails.moves.length} movimientos)`);
                }
            } catch (error) {
                console.log(`Error al obtener Pokémon con ID ${randomId}:`, error);
            }
        }

        return validPokemon;
    }

    private static async formatPokemonDetails(data: any): Promise<PokemonDetails> {
        const types: string[] = data.types.map((typeInfo: any) => typeInfo.type.name);
        const selectedMoves: PokemonMove[] = await PokemonAPI.getPokemonMoves(data, types);

        const stats: PokemonStats = {
            hp: data.stats.find((stat: any) => stat.stat.name === "hp").base_stat,
            attack: data.stats.find((stat: any) => stat.stat.name === "attack").base_stat,
            defense: data.stats.find((stat: any) => stat.stat.name === "defense").base_stat,
            specialAttack: data.stats.find((stat: any) => stat.stat.name === "special-attack").base_stat,
            specialDefense: data.stats.find((stat: any) => stat.stat.name === "special-defense").base_stat,
            speed: data.stats.find((stat: any) => stat.stat.name === "speed").base_stat
        };

        const DEFAULT_ICON = "/assets/img/default-icon.png";

        return {
            id: data.id,
            name: data.name,
            types: types,
            stats: stats,
            moves: selectedMoves,
            images: {
                front: data.sprites.other["showdown"].front_default,
                back: data.sprites.other["showdown"].back_default,
                icon: data.sprites.versions["generation-viii"].icons.front_default || DEFAULT_ICON
            }
        };
    }

    private static async getPokemonMoves(data: any, pokemonTypes: string[]): Promise<PokemonMove[]> {
        const moves: PokemonMove[] = await Promise.all(
            data.moves.map(async (move: any) => {
                const moveResponse = await fetch(move.move.url);
                const moveData = await moveResponse.json();
                return {
                    id: moveData.id,
                    name: moveData.name,
                    accuracy: moveData.accuracy,
                    category: moveData.damage_class.name,
                    power: moveData.power || 0,
                    type: moveData.type.name
                };
            })
        );

        const filteredMoves = moves.filter(
            move => (move.category === "physical" || move.category === "special") && move.power > 0
        );

        const stabMoves = filteredMoves.filter(move => pokemonTypes.includes(move.type));
        const nonStabMoves = filteredMoves.filter(move => !pokemonTypes.includes(move.type));

        let selectedMoves: PokemonMove[] = [];

        pokemonTypes.forEach(type => {
            const movesOfType = stabMoves.filter(move => move.type === type);
            if (movesOfType.length > 0) {
                selectedMoves.push(movesOfType[Math.floor(Math.random() * movesOfType.length)]);
            }
        });

        const remainingMoves = [...stabMoves, ...nonStabMoves]
            .filter(move => !selectedMoves.includes(move))
            .sort(() => Math.random() - 0.5);

        selectedMoves = [...selectedMoves, ...remainingMoves].slice(0, 4);

        return selectedMoves;
    }
}