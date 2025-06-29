import { Engine } from '@core/Engine';
import { EventBus } from '@core/EventBus';
import { World } from '@ecs/World';
import { BattleUI } from '@ui/BattleUI';
import { loadBattle } from "../scenes/loadBattle";

export class Game {
    private engine: Engine;
    private eventBus: EventBus;
    private world: World;
    private battleUI: BattleUI;

    constructor() {
        this.eventBus = new EventBus();
        this.world = new World();
        this.engine = new Engine(this.eventBus, this.world);
        this.battleUI = new BattleUI(this.world, this.eventBus);
    }

    start() {
        console.log('🎮 Starting Pokémon Battle Simulator...');
        loadBattle(this.world); // ← acá se cargan las entidades y componentes
        this.engine.start();    // ← se registran los sistemas

        this.battleUI.render();
        this.battleUI.listenToUI();

        this.eventBus.on('stateChanged', () => {
            this.battleUI.render();
        });
    }

    stop() {
        this.engine.stop();
        this.world.clear();
    }
}
