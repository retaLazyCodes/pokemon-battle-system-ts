import { EventBus } from '@core/EventBus';
import { System } from './System';

export class SystemManager {
    private systems: System[] = [];
    private eventBus: EventBus;

    constructor(eventBus: EventBus) {
        this.eventBus = eventBus;
    }

    register(system: System) {
        this.systems.push(system);
        system.init();
    }

    clear() {
        this.systems.forEach(system => system.destroy?.());
        this.systems = [];
    }
}
