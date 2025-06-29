import { EventBus } from '../src/core/EventBus';
import { World } from '../src/ecs/World';
import { ComponentStorage } from '../src/ecs/ComponentStorage';
import { SystemManager } from '../src/ecs/SystemManager';
import { BattleSystem } from '../src/systems/BattleSystem';
import { DamageSystem } from '../src/systems/DamageSystem';

import { NameComponent } from '../src/components/NameComponent';
import { HealthComponent } from '../src/components/HealthComponent';
import { MoveComponent } from '../src/components/MoveComponent';
import { mockEntities } from '../src/mock/mockEntities';


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