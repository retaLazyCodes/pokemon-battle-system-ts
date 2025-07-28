import { Entity } from './Entity';

/**
 * EntityManager is responsible for creating, storing, and managing all entities in the ECS architecture.
 * Each entity is uniquely identified by a numeric ID and serves as a container for components.
 *
 * Responsibilities:
 * - Generates unique `Entity` instances with auto-incremented IDs.
 * - Stores all active entities in memory.
 * - Provides lookup, removal, and clearing functionality for entity lifecycle management.
 *
 * Methods:
 * - `createEntity()`: Creates a new entity with a unique ID and adds it to the manager.
 * - `getEntity(id)`: Retrieves an existing entity by its ID. Throws an error if not found.
 * - `getAllEntities()`: Returns an array of all currently registered entities.
 * - `removeEntity(id)`: Removes an entity by its ID.
 * - `clear()`: Clears all entities from the manager.
 *
 * Notes:
 * - Entities themselves are just ID holders. All data is stored in component storages managed by `World`.
 * - Entity IDs are assigned sequentially using a global counter (`nextId` in `Entity` class).
 */

export class EntityManager {
    private entities = new Map<number, Entity>();

    createEntity(): Entity {
        const entity = new Entity();
        this.entities.set(entity.id, entity);
        return entity;
    }

    getEntity(id: number): Entity {
        const entity = this.entities.get(id);
        if (!entity) throw new Error(`Entity with ID ${id} not found`);
        return entity;
    }

    getAllEntities(): Entity[] {
        return Array.from(this.entities.values());
    }

    removeEntity(id: number) {
        this.entities.delete(id);
    }

    clear() {
        this.entities.clear();
    }
}
