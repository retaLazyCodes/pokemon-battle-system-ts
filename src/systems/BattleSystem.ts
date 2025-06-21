import { EventBus } from '@core/EventBus';
import { World } from '@ecs/World';
import { System } from '@ecs/System';
import { Entity } from '@ecs/Entity';
import { MoveComponent } from '@components/MoveComponent';
import { NameComponent } from '@components/NameComponent';

/**
 * BattleSystem handles player actions during a battle turn.
 *
 * It listens to the `playerAction` event, retrieves the attacker's move,
 * and emits events to apply damage and report the outcome of the turn.
 *
 * Dependencies:
 * - EventBus: for emitting and listening to game events.
 * - World: to access entities and their components.
 *
 * Listens to:
 * - `playerAction`: { attackerId: number, targetId: number, moveIndex: number }
 *
 * Emits:
 * - `damageApplied`: { targetId: number, damage: number }
 * - `turnProcessed`: { result: string }
 *
 * Example flow:
 * - A player clicks an attack → `playerAction` event is emitted.
 * - BattleSystem retrieves the move → emits `damageApplied`.
 * - UI or log system receives `turnProcessed` and updates the view.
 */

interface PlayerActionPayload {
  attackerId: number;
  targetId: number;
  moveIndex: number;
}

export class BattleSystem extends System {
    constructor(private eventBus: EventBus, private world: World) {
        super();
    }

    init() {
        console.log('⚔️ BattleSystem initialized.');

        this.eventBus.on('playerAction', this.onPlayerAction.bind(this));
    }

    private onPlayerAction (action: PlayerActionPayload) {
        const attacker: Entity = this.world.entityManager.getEntity(action.attackerId);
        const target: Entity = this.world.entityManager.getEntity(action.targetId);

        const moveStorage = this.world.getStorage<MoveComponent>('Move');
        const nameStorage = this.world.getStorage<NameComponent>('Name');

        const move = moveStorage.get(attacker)?.getMoveAt(action.moveIndex);

        if (!move) {
          console.warn('❌ Move not found for attacker:', attacker.id);
          return;
        }

        const attackerName = nameStorage.get(attacker)?.name ?? `Entity#${attacker.id}`;
        const targetName = nameStorage.get(target)?.name ?? `Entity#${target.id}`;

        console.log(`⚔️ ${attackerName} used ${move.name} on ${targetName}!`);

        this.eventBus.emit('damageApplied', {
          targetId: target.id,
          damage: move.power
        });

        this.eventBus.emit('turnProcessed', {
          result: `${attackerName} used ${move.name} on ${targetName}!`
        });
    }

    destroy() {
        this.eventBus.off('playerAction', this.onPlayerAction.bind(this));
    }
}
