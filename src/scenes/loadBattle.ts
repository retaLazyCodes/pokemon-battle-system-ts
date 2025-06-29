import { World } from '@ecs/World';
import { ComponentStorage } from '@ecs/ComponentStorage';
import { NameComponent } from '@components/NameComponent';
import { HealthComponent } from '@components/HealthComponent';
import { MoveComponent, MoveCategory } from '@components/MoveComponent';

export function loadBattle(world: World) {
    const names = new ComponentStorage<NameComponent>();
    const healths = new ComponentStorage<HealthComponent>();
    const moves = new ComponentStorage<MoveComponent>();

    world.addComponentStorage('Name', names);
    world.addComponentStorage('Health', healths);
    world.addComponentStorage('Move', moves);

    const pikachu = world.entityManager.createEntity();
    names.add(pikachu, new NameComponent('Pikachu'));
    healths.add(pikachu, new HealthComponent(50, 50));
    moves.add(pikachu, new MoveComponent([{ name: 'Impactrueno', power: 40, id: 'impactrueno', accuracy: 100, type: 'Electric', category: MoveCategory.SPECIAL }]));

    const bulbasaur = world.entityManager.createEntity();
    names.add(bulbasaur, new NameComponent('Bulbasaur'));
    healths.add(bulbasaur, new HealthComponent(45, 45));
    moves.add(bulbasaur, new MoveComponent([{ name: 'Látigo Cepa', power: 45, id: 'latigo-cepa', accuracy: 100, type: 'Grass', category: MoveCategory.PHYSICAL }]));

    console.log('⚔️ Combate cargado con:');
    for (const [id, name] of names.entries()) {
        const hp = healths.get(world.entityManager.getEntity(id)!);
        console.log(`- ${name.name} (HP: ${hp?.current}/${hp?.max})`);
    }
}