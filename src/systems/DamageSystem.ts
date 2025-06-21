import { EventBus } from '@core/EventBus';
import { System } from '@ecs/System';
import { World } from '@ecs/World';
import { HealthComponent } from '@components/HealthComponent';
import { Entity } from '@ecs/Entity';

/**
 * DamageSystem is responsible for applying damage to entities
 * when a `damageApplied` event is received.
 *
 * It reads the `HealthComponent` of the target entity, subtracts the damage,
 * and emits a `pokemonFainted` event if HP drops to zero or below.
 *
 * Listens to:
 * - `damageApplied`: { targetId: number, damage: number }
 *
 * Emits:
 * - `pokemonFainted`: { entityId: number }
 */

export class DamageSystem extends System {
    constructor(private eventBus: EventBus, private world: World) {
        super();
    }

    init () {
        console.log('💣 DamageSystem initialized.');
        this.eventBus.on('damageApplied', this.onDamageApplied.bind(this));
    }

    private onDamageApplied ({ targetId, damage }: { targetId: number; damage: number }) {
        const target: Entity = this.world.entityManager.getEntity(targetId);
        const healthStorage = this.world.getStorage<HealthComponent>('Health');
        const health = healthStorage.get(target);

        if (!health) {
            console.warn(`⚠️ No HealthComponent found for entity ${targetId}`);
            return;
        }

        health.takeDamage(damage);
        console.log(`💥 Entity ${targetId} took ${damage} damage! HP is now ${health.current}/${health.max}`);

        if (health.current <= 0) {
            console.log(`💀 Entity ${targetId} has fainted.`);
            this.eventBus.emit('pokemonFainted', { entityId: targetId });
        }
    }

    destroy () {
        this.eventBus.off('damageApplied', this.onDamageApplied.bind(this));
    }
}
