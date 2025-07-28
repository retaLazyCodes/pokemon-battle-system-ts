import { EventBus } from '@game/core/EventBus';
import { World } from '@game/ecs/World';
import { ComponentStorage } from '@game/ecs/ComponentStorage';
import { SystemManager } from '@game/ecs/SystemManager';
import { BattleSystem } from '@game/systems/BattleSystem';
import { DamageSystem } from '@game/systems/DamageSystem';

import { NameComponent } from '@game/components/NameComponent';
import { HealthComponent } from '@game/components/HealthComponent';
import { MoveComponent } from '@game/components/MoveComponent';
import { mockEntities } from '@game/mock/mockEntities';


// Setup
const eventBus = new EventBus();
const world = new World();

// Registramos los storages necesarios
world.addComponentStorage('Health', new ComponentStorage<HealthComponent>());
world.addComponentStorage('Move', new ComponentStorage<MoveComponent>());
world.addComponentStorage('Name', new ComponentStorage<NameComponent>());

// Creamos entidades de prueba
const { pikachu, charmander } = mockEntities(world);

// Instanciamos y registramos los sistemas
const systemManager = new SystemManager(eventBus);
systemManager.register(new BattleSystem(eventBus, world));
systemManager.register(new DamageSystem(eventBus, world));

// Simulamos un combate
let IS_BATTLE_FINISHED = false

// const entities = [pikachu, charmander]

eventBus.on('pokemonFainted', ({ entityId }: { entityId: number }) => {
    const entity = world.getEntityBattleData(entityId)
    // console.log(entity)
    IS_BATTLE_FINISHED = true;
});

while (!IS_BATTLE_FINISHED) {
    eventBus.emit('playerAction', {
        type: "attack",
        moveIndex: 0
    });
}