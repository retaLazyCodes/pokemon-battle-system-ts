import { Engine } from '@game/core/Engine';
import { EventBus } from '@game/core/EventBus';
import { World } from '@game/ecs/World';
import { BattleUI } from '@ui/core/BattleUI';
import { loadBattle } from "@game/scenes/loadBattle";
import { PokemonDetails } from '@shared/services/pokemonApi';

/**
 * Game serves as the high-level entry point and coordinator of the entire battle simulation.
 * It wires together the core architecture: EventBus, ECS World, Engine (systems), and UI.
 *
 * Responsibilities:
 * - Instantiates and connects the main components of the game (EventBus, World, Engine, UI).
 * - Loads the initial game state (entities and components) via `loadBattle()`.
 * - Starts the engine to register core systems.
 * - Renders and connects the battle UI to event-driven updates.
 *
 * Methods:
 * - `start()`: Loads the game state, starts the engine, renders UI, and sets up event listeners.
 * - `stop()`: Stops the engine and clears the ECS world state.
 *
 * Notes:
 * - This is not a game loop. The flow is entirely event-driven (e.g., user clicks).
 * - The `EventBus` is used to trigger UI updates reactively based on internal game state changes.
 * - Acts as a facade for launching and stopping the simulation.
 */

export class Game {
    private engine: Engine;
    public eventBus: EventBus;
    public world: World;
    private battleUI: BattleUI;

    constructor() {
        this.eventBus = new EventBus();
        this.world = new World();
        this.engine = new Engine(this.eventBus, this.world);
        this.battleUI = new BattleUI(this.world, this.eventBus);
    }

    start(pokemons: PokemonDetails[]) {
        console.log('🎮 Starting Pokémon Battle Simulator...');
        loadBattle(this.world, pokemons); // ← acá se cargan las entidades y componentes
        this.engine.start();    // ← se registran los sistemas

        // this.battleUI.render();
        // this.battleUI.listenToUI();

        // this.eventBus.on('stateChanged', () => {
        //     this.battleUI.render();
        // });
    }

    stop() {
        this.engine.stop();
        this.world.clear();
    }
}
