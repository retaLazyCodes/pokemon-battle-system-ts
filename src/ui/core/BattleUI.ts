import { EventBus } from "@game/core/EventBus";
import { World } from "@game/ecs/World";
import { Entity } from "@game/ecs/Entity";
import { HealthComponent } from "@game/components/HealthComponent";
import { NameComponent } from "@game/components/NameComponent";

export class BattleUI {
    constructor(private world: World, private eventBus: EventBus) { }

    render () {
        const app = document.getElementById('app')!;
        const nameStorage = this.world.getStorage<NameComponent>('Name');
        const healthStorage = this.world.getStorage<HealthComponent>('Health');

        app.innerHTML = '';

        for (const [entityId, nameComp] of nameStorage.entries()) {
            const entity: Entity = this.world.entityManager.getEntity(entityId);
            const healthComp = healthStorage.get(entity)!;
            const div = document.createElement('div');
            div.textContent = `${nameComp.name} (HP: ${healthComp.current}/${healthComp.max})`;
            app.appendChild(div);
        }
    }

    listenToUI () {
        document.getElementById('attack-buttons')?.addEventListener('click', e => {
            const target = e.target as HTMLElement;
            if (target.matches('button[data-action="attack"]')) {
                const moveId = target.getAttribute('data-move-id');
                this.eventBus.emit('playerAction', { moveId });
            }
        });
    }
}
