import { Entity } from './Entity';

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
