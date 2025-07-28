import { EventBus } from '@game/core/EventBus';
import { World } from '@game/ecs/World';
import { System } from '@game/ecs/System';
import { MoveComponent } from '@game/components/MoveComponent';
import { NameComponent } from '@game/components/NameComponent';

/**
 * BattleSystem
 * --------------------------------------------------------------------------
 * This system handles the battle flow and game rules.
 * It listens for `playerAction` events emitted by the InputSystem.
 * Based on the current battle state (active Pokémon, targets),
 * it processes the turn, applies damage, and emits results.
 *
 * Responsibilities:
 * - Maintain the current battle state (who is attacking, who is defending).
 * - Validate and process actions (attacks, switches, etc.).
 * - Interact with components like MoveComponent and HealthComponent.
 * - Emit events like `damageApplied` and `turnProcessed` so that
 *   other systems (UI, logging, animations) can react.
 *
 * Listens to:
 * - `playerAction` event: { type, moveIndex, ... }
 *
 * Emits:
 * - `damageApplied` event: { targetId, damage }
 * - `turnProcessed` event: { result }
 * 
 * Dependencies:
 * - EventBus: for emitting and listening to game events.
 * - World: to access entities and their components.
 *
 * Key principle:
 * - Keeps the battle state and game logic consistent.
 * - The UI systems never handle or store battle logic.
 */

interface PlayerActionPayload {
    type: 'attack' | 'switch';
    moveIndex?: number;
    pokemonId?: number;
}

export class BattleSystem extends System {
    private activeAttackerId: number;
    private activeDefenderId: number;

    constructor(private eventBus: EventBus, private world: World) {
        super();
        // Init default values
        this.activeAttackerId = 0;
        this.activeDefenderId = 1;
    }

    init () {
        console.log('⚔️ BattleSystem initialized.');
        this.eventBus.on('playerAction', this.onPlayerAction.bind(this));
    }

    private onPlayerAction (action: PlayerActionPayload) {
        if (action.type === 'attack' && action.moveIndex !== undefined) {
            const attacker = this.world.entityManager.getEntity(this.activeAttackerId);
            const target = this.world.entityManager.getEntity(this.activeDefenderId);

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

            // 🔄 Cambiar roles después del turno
            this.swapRoles();
        }

        if (action.type === 'switch' && action.pokemonId !== undefined) {
            console.log(`🔄 Switching attacker to #${action.pokemonId}`);
            this.activeAttackerId = action.pokemonId;
        }
    }

    private swapRoles () {
        const temp = this.activeAttackerId;
        this.activeAttackerId = this.activeDefenderId;
        this.activeDefenderId = temp;
    }

    destroy () {
        this.eventBus.off('playerAction', this.onPlayerAction.bind(this));
    }
}  
