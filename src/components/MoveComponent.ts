import { Component } from '@ecs/Component';

export enum MoveCategory {
    PHYSICAL = 'PHYSICAL',
    SPECIAL = 'SPECIAL',
    STATUS = 'STATUS'
}

export interface Move {
    id: string;
    name: string;
    power: number;
    accuracy: number;
    type: string;
    category: MoveCategory;
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