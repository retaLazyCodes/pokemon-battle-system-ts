import { Engine } from '@core/Engine';
import { EventBus } from '@core/EventBus';

export class Game {
    private engine: Engine;
    private eventBus: EventBus;

    constructor() {
        this.eventBus = new EventBus();
        this.engine = new Engine(this.eventBus);
    }

    start() {
        console.log('🎮 Starting Pokémon Battle Simulator...');
        this.engine.start();
    }
}
