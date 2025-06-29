import { EventBus } from "@core/EventBus";
import { World } from "@ecs/World";
import { Entity } from "@ecs/Entity";
import { HealthComponent } from "@components/HealthComponent";
import { NameComponent } from "@components/NameComponent";

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
