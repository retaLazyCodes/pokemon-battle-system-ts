import { Component } from '@game/ecs/Component';

export class SpriteComponent implements Component {
    constructor(
        public frontSprite: string,
        public backSprite: string,
        public iconSprite: string
    ) {}
}
