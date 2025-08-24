import { World } from '@game/ecs/World';
import { ComponentStorage } from '@game/ecs/ComponentStorage';
import { NameComponent } from '@game/components/NameComponent';
import { HealthComponent } from '@game/components/HealthComponent';
import { MoveComponent, MoveCategory } from '@game/components/MoveComponent';
import { SpriteComponent } from '@game/components/SpriteComponent';
import { PokemonDetails, PokemonMove } from '@shared/services/pokemonApi';

export function loadBattle(world: World, pokemons: PokemonDetails[]) {
    const names = new ComponentStorage<NameComponent>();
    const healths = new ComponentStorage<HealthComponent>();
    const moves = new ComponentStorage<MoveComponent>();
    const sprites = new ComponentStorage<SpriteComponent>();

    world.addComponentStorage('Name', names);
    world.addComponentStorage('Health', healths);
    world.addComponentStorage('Move', moves);
    world.addComponentStorage('Sprite', sprites);

    pokemons.forEach(pokemon => {
        console.log(pokemon)
        const entity = world.entityManager.createEntity();
        names.add(entity, new NameComponent(pokemon.name));
        healths.add(entity, new HealthComponent(pokemon.stats.hp, pokemon.stats.hp));
        moves.add(entity, new MoveComponent(
            pokemon.moves.map((m: PokemonMove) => ({
                id: m.id,
                name: m.name,
                power: m.power,
                accuracy: m.accuracy,
                type: m.type,
                category: m.category as MoveCategory
            }))
        ));
        sprites.add(entity, new SpriteComponent(
            pokemon.images.front,
            pokemon.images.back,
            pokemon.images.icon
        ));
    });

    console.log('⚔️ Combate cargado con:');
    for (const [id, name] of names.entries()) {
        const hp = healths.get(world.entityManager.getEntity(id)!);
        console.log(`- ${name.name} (HP: ${hp?.current}/${hp?.max})`);
    }
}