import { EventBus } from '@core/EventBus';
import { SystemManager } from '@ecs/SystemManager';
import { World } from '@ecs/World';
import { BattleSystem } from '@systems/BattleSystem';
import { InputSystem } from "@systems/InputSystem";
import { DamageSystem } from '@systems/DamageSystem';

export class Engine {
    private eventBus: EventBus;
    private world: World;
    private systemManager: SystemManager;

    constructor(eventBus: EventBus, world: World) {
        this.eventBus = eventBus;
        this.world = world;
        this.systemManager = new SystemManager(eventBus);
    }

    start() {
        console.log('🛠️ Engine: Initializing systems...');

        this.systemManager.register(new InputSystem(this.eventBus));

        this.systemManager.register(new BattleSystem(this.eventBus, this.world));
        this.systemManager.register(new DamageSystem(this.eventBus, this.world));

        console.log('✅ Systems initialized - ready for battle!');
    }

    stop() {
        console.log('🛑 Engine: Stopping systems...');
        this.systemManager.clear();
    }
}
