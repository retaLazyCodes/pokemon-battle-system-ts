import { Component } from '@game/ecs/Component';

export enum MoveCategory {
    PHYSICAL = 'physical',
    SPECIAL = 'special',
    STATUS = 'status'
}

export interface Move {
    id: string;
    name: string;
    power: number;
    accuracy: number;
    type: string;
    category: MoveCategory;
    index: number;
}

export class MoveComponent implements Component {
    constructor(private _moves: Move[]) { }

    get moves (): Move[] {
        return this._moves;
    }

    getMoveAt (index: number): Move | null {
        return this._moves[index] ?? null;
    }
  }