import { EventBus } from '@core/EventBus';
import { SystemManager } from '@ecs/SystemManager';
import { BattleSystem } from '@systems/BattleSystem';
import {InputSystem} from "@systems/InputSystem.ts";

export class Engine {
    private eventBus: EventBus;
    private systemManager: SystemManager;

    constructor(eventBus: EventBus) {
        this.eventBus = eventBus;
        this.systemManager = new SystemManager(eventBus);
    }

    start() {
        console.log('🛠️ Engine: Initializing systems...');

        this.systemManager.register(new InputSystem(this.eventBus));
        this.systemManager.register(new BattleSystem(this.eventBus));

        console.log('✅ Systems initialized - ready for battle!');
    }

    stop() {
        console.log('🛑 Engine: Stopping systems...');
        this.systemManager.clear();
    }
}
