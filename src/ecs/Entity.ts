let nextId = 0;

export class Entity {
    readonly id: number;

    constructor() {
        this.id = nextId++;
    }
}
