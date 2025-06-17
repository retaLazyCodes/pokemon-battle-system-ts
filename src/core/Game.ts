import { Engine } from '@core/Engine';
import { EventBus } from '@core/EventBus';
import { World } from '@ecs/World';
import { loadBattle } from "../scenes/loadBattle.ts";

export class Game {
    private engine: Engine;
    private eventBus: EventBus;
    private world: World;

    constructor() {
        this.eventBus = new EventBus();
        this.world = new World();
        this.engine = new Engine(this.eventBus);
    }

    start() {
        console.log('🎮 Starting Pokémon Battle Simulator...');
        loadBattle(this.world); // ← acá se cargan las entidades y componentes
        this.engine.start();    // ← se registran los sistemas
    }

    stop() {
        this.engine.stop();
        this.world.clear();
    }
}
