import { EventBus } from '@core/EventBus';
import { System } from '@ecs/System';

export class BattleSystem extends System {
    constructor(private eventBus: EventBus) {
        super();
    }

    init() {
        console.log('⚔️ BattleSystem initialized.');

        this.eventBus.on('playerAction', this.onPlayerAction.bind(this));
    }

    private onPlayerAction(action: any) {
        console.log(`BattleSystem: Player selected action:`, action);

        // Procesar el turno: aplicar daño, actualizar estados, emitir eventos
        this.eventBus.emit('turnProcessed', { result: 'Pikachu atacó con Impactrueno!' });
    }

    destroy() {
        this.eventBus.off('playerAction', this.onPlayerAction.bind(this));
    }
}
