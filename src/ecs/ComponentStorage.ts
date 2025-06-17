import { Component } from './Component';
import { Entity } from './Entity';

/**
 * ComponentStorage is a generic container used to store and manage components of a specific type.
 * It maps entity IDs to their corresponding component instances.
 *
 * Methods:
 * - `add(entityId, component)`: Associates a component with an entity.
 * - `get(entityId)`: Retrieves the component associated with an entity, or undefined if not present.
 * - `has(entityId)`: Checks if the storage contains a component for the given entity.
 * - `remove(entityId)`: Removes the component associated with the given entity.
 * - `entries()`: Returns an iterator of `[entityId, component]` pairs for iteration.
 * - `clear()`: Removes all stored components.
 *
 * Type Parameters:
 * - `T`: The type of component being stored.
 *
 * Notes:
 * - Each entity can have at most one component of a given type in the storage.
 * - Internally uses a `Map<number, T>` to associate entities to components.
 */

export class ComponentStorage<T extends Component> {
    private components = new Map<number, T>();

    add(entity: Entity, component: T) {
        this.components.set(entity.id, component);
    }

    get(entity: Entity): T | undefined {
        return this.components.get(entity.id);
    }

    has(entity: Entity): boolean {
        return this.components.has(entity.id);
    }

    remove(entity: Entity) {
        this.components.delete(entity.id);
    }

    entries(): [number, T][] {
        return Array.from(this.components.entries());
    }

    clear() {
        this.components.clear();
    }
}
