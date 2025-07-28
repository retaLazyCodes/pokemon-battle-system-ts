import { Component } from '@game/ecs/Component';

export class HealthComponent implements Component {
    constructor(private _current: number, public max: number) { }

    get current (): number {
        return this._current;
    }

    set current (value: number) {
        this._current = Math.max(0, Math.min(value, this.max));
    }

    takeDamage (amount: number) {
        this.current -= amount;
    }
}