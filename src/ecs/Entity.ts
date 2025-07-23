/**
 * Entity represents a unique object in the game world.
 * It is identified by an auto-incremented numeric ID.
 *
 * Responsibilities:
 * - Acts as an ID-only container; all data and behavior are stored in associated components.
 *
 * Fields:
 * - `id`: A unique identifier assigned automatically at creation.
 *
 * Notes:
 * - Entities do not store any state or logic directly.
 * - Component storages in the `World` use the entity reference as a key.
 */

let nextId = 0;

export class Entity {
    readonly id: number;

    constructor() {
        this.id = nextId++;
    }
}
