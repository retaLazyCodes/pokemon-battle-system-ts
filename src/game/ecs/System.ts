/**
 * System is an abstract base class that defines the interface for all systems in the ECS architecture.
 * Systems encapsulate game logic and operate on specific component types in response to events.
 *
 * Responsibilities:
 * - Subscribe to relevant events via `EventBus`.
 * - Apply logic to entities or components based on event triggers or game state.
 *
 * Methods:
 * - `init()`: Called once when the system is registered. Used for setup and event subscriptions.
 * - `destroy()?`: Optional cleanup hook called when the system is unregistered.
 *
 * Notes:
 * - All concrete systems (e.g., `InputSystem`, `BattleSystem`, etc.) must extend this class.
 * - Systems do not run on a loop; they react to events and modify world state accordingly.
 */

export abstract class System {
    abstract init(): void;
    destroy?(): void;
}
