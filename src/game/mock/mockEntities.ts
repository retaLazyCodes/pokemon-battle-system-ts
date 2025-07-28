import { World } from '@game/ecs/World';
import { NameComponent } from '@game/components/NameComponent';
import { HealthComponent } from '@game/components/HealthComponent';
import { MoveComponent, MoveCategory, Move } from '@game/components/MoveComponent';

export function mockEntities (world: World) {
    const pikachu = world.entityManager.createEntity();
    const charmander = world.entityManager.createEntity();

    const thunderShock: Move = {
        id: 'thunderbolt',
        name: 'Thunderbolt',
        power: 90,
        accuracy: 100,
        type: 'Electric',
        category: MoveCategory.SPECIAL,
    };

    const ember: Move = {
        id: 'ember',
        name: 'Ember',
        power: 40,
        accuracy: 100,
        type: 'Fire',
        category: MoveCategory.SPECIAL,
    };

    world.getStorage<NameComponent>('Name').add(pikachu, new NameComponent('Pikachu'));
    world.getStorage<HealthComponent>('Health').add(pikachu, new HealthComponent(100, 100));
    world.getStorage<MoveComponent>('Move').add(pikachu, new MoveComponent([thunderShock]));

    world.getStorage<NameComponent>('Name').add(charmander, new NameComponent('Charmander'));
    world.getStorage<HealthComponent>('Health').add(charmander, new HealthComponent(100, 100));
    world.getStorage<MoveComponent>('Move').add(charmander, new MoveComponent([ember]));

    return { pikachu, charmander };
}
