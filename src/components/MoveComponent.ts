import { Component } from '@ecs/Component';

export interface Move {
    name: string;
    power: number;
}

export class MoveComponent implements Component {
    constructor(public moves: Move[]) {}
}