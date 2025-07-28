import { EventBus } from '@game/core/EventBus';
import { SystemManager } from '@game/ecs/SystemManager';
import { World } from '@game/ecs/World';
import { BattleSystem } from '@game/systems/BattleSystem';
import { InputSystem } from "@game/systems/InputSystem";
import { DamageSystem } from '@game/systems/DamageSystem';

/**
 * Engine is responsible for initializing and managing the core systems of the game.
 * It sets up the required systems and allows starting or stopping them as needed.
 * 
 *
 * Responsibilities:
 * - Registers core game systems (Input, Battle, Damage) during initialization.
 * - Cleans up all systems when stopping the game.
 * - Acts as the entry point for system orchestration.
 *
 * Dependencies:
 * - `EventBus`: Enables decoupled communication between systems and UI components.
 * - `World`: Represents all game entities and their components.
 * - `SystemManager`: Handles system registration and lifecycle.
 *
 * Methods:
 * - `start()`: Registers all necessary systems and logs the setup.
 * - `stop()`: Unregisters all systems and logs the shutdown.
 *
 * Notes:
 * - There is no main game loop; instead, systems react to dispatched events such as user input.
 * - This class is typically called from a higher-level `Game.ts` controller.
 */

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
