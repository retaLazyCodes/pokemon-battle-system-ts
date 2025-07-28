import { EventBus } from '@game/core/EventBus';
import { System } from './System';

/**
 * SystemManager is responsible for managing all active systems in the ECS architecture.
 * It handles system lifecycle operations such as registration and cleanup.
 *
 * Responsibilities:
 * - Registers systems and calls their `init()` lifecycle hook.
 * - Cleans up systems by calling their optional `destroy()` method.
 * - Stores systems in the order they were registered.
 *
 * Dependencies:
 * - `EventBus`: Passed in to systems so they can subscribe to or emit game events.
 *
 * Methods:
 * - `register(system)`: Adds a system to the manager and initializes it.
 * - `clear()`: Destroys all registered systems and resets the internal list.
 *
 * Notes:
 * - Systems must implement the `System` abstract class.
 * - The `destroy()` method is optional and only called if defined.
 * - This class does not control system execution order or update frequency, as the game is event-driven.
 */

export class SystemManager {
    private systems: System[] = [];
    private eventBus: EventBus;

    constructor(eventBus: EventBus) {
        this.eventBus = eventBus;
    }

    register(system: System) {
        this.systems.push(system);
        system.init();
    }

    clear() {
        this.systems.forEach(system => system.destroy?.());
        this.systems = [];
    }
}
