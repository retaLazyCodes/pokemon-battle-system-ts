import { EntityManager } from './EntityManager';
import { ComponentStorage } from './ComponentStorage';
import { Component } from './Component';

/**
 * World is the central data container in the ECS architecture.
 * It manages all `ComponentStorage` instances and provides access to the `EntityManager`.
 *
 * Fields:
 * - `entityManager`: Responsible for creating and tracking entity IDs.
 *
 * Methods:
 * - `addComponentStorage(key, storage)`: Registers a component storage under a specific string key.
 * - `getStorage(key)`: Retrieves the component storage associated with the given key.
 * - `clear()`: Clears all component storages and resets the entity manager.
 *
 * Type Parameters:
 * - `T`: The type of component stored in the component storage.
 *
 * Notes:
 * - The `key` is a string identifier used to distinguish between different component types.
 * - All component storages are stored in a `Map<string, ComponentStorage<any>>`.
 * - This implementation does not automatically generate or resolve keys based on component classes.
 *   Keys must be registered and used consistently (e.g., `'health'`, `'position'`, etc.).
 */


export class World {
    entityManager = new EntityManager();
    private storages = new Map<string, ComponentStorage<any>>();

    addComponentStorage<T extends Component>(key: string, storage: ComponentStorage<T>) {
        this.storages.set(key, storage);
    }

    getStorage<T extends Component>(key: string): ComponentStorage<T> {
        const storage = this.storages.get(key);
        if (!storage) throw new Error(`Storage not found: ${key}`);
        return storage;
    }

    getEntityBattleData (entityId: number) {
        const entity = this.entityManager.getEntity(entityId);
        const name = this.storages.get('Name')?.get(entity)?.name ?? 'Unknown';
        const health = this.storages.get('Health')?.get(entity)?.current ?? 0;
        const moves = this.storages.get('Move')?.get(entity)?.moves ?? [];

        return {
            id: entity.id,
            name,
            health,
            moves
        };
    }
      
    clear() {
        this.entityManager.clear();
        this.storages.forEach(storage => storage.clear());
    }
}
