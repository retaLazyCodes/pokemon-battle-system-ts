import { Component } from '@game/ecs/Component';

export class NameComponent implements Component {
    constructor(public name: string) {}
}
