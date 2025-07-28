import { EventBus } from '@game/core/EventBus';
import { System } from '@game/ecs/System';
import { World } from '@game/ecs/World';
import { Entity } from '@game/ecs/Entity';
import { HealthComponent } from '@game/components/HealthComponent';
import { NameComponent } from '@game/components/NameComponent';


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
        const nameStorage = this.world.getStorage<NameComponent>('Name');
        const health = healthStorage.get(target);
        const name = nameStorage.get(target);

        if (!health) {
            console.warn(`⚠️ No HealthComponent found for entity ${targetId}`);
            return;
        }
        if (!name) {
            console.warn(`⚠️ No NameComponent found for entity ${targetId}`);
            return;
        }

        health.takeDamage(damage);
        console.log(`💥 Entity ${name.name} took ${damage} damage! HP is now ${health.current}/${health.max}`);

        if (health.current <= 0) {
            console.log(`💀 Entity ${name.name} has fainted.`);
            this.eventBus.emit('pokemonFainted', { entityId: targetId });
        }
    }

    destroy () {
        this.eventBus.off('damageApplied', this.onDamageApplied.bind(this));
    }
}
