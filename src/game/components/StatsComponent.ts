import { Component } from '@game/ecs/Component';
import { Stats } from '@shared/utils/statsUtils';

export class StatsComponent implements Component {
    constructor(public stats: Stats) {}
}
