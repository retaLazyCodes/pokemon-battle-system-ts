import { Component } from '@ecs/Component';

export class HealthComponent implements Component {
    constructor(public current: number, public max: number) {}
}