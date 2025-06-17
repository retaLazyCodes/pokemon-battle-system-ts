import { World } from '@ecs/World';
import { ComponentStorage } from '@ecs/ComponentStorage';
import { NameComponent } from '@components/NameComponent';
import { HealthComponent } from '@components/HealthComponent';
import { MoveComponent, Move } from '@components/MoveComponent';

export function loadBattle(world: World) {
    const names = new ComponentStorage<NameComponent>();
    const healths = new ComponentStorage<HealthComponent>();
    const moves = new ComponentStorage<MoveComponent>();

    world.addComponentStorage('name', names);
    world.addComponentStorage('health', healths);
    world.addComponentStorage('moves', moves);

    const pikachu = world.entityManager.createEntity();
    names.add(pikachu, new NameComponent('Pikachu'));
    healths.add(pikachu, new HealthComponent(35, 35));
    moves.add(pikachu, new MoveComponent([{ name: 'Impactrueno', power: 40 }]));

    const bulbasaur = world.entityManager.createEntity();
    names.add(bulbasaur, new NameComponent('Bulbasaur'));
    healths.add(bulbasaur, new HealthComponent(45, 45));
    moves.add(bulbasaur, new MoveComponent([{ name: 'Látigo Cepa', power: 45 }]));

    console.log('⚔️ Combate cargado con:');
    for (const [id, name] of names.entries()) {
        const hp = healths.get(world.entityManager.getEntity(id)!);
        console.log(`- ${name.name} (HP: ${hp?.current}/${hp?.max})`);
    }
}