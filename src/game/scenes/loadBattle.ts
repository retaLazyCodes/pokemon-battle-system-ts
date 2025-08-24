import { World } from '@game/ecs/World';
import { ComponentStorage } from '@game/ecs/ComponentStorage';
import { NameComponent } from '@game/components/NameComponent';
import { HealthComponent } from '@game/components/HealthComponent';
import { MoveComponent, MoveCategory } from '@game/components/MoveComponent';
import { SpriteComponent } from '@game/components/SpriteComponent';
import { StatsComponent } from '@game/components/StatsComponent';
import { PokemonEntityFactory } from '../factories/PokemonEntityFactory';
import { PokemonDetails, PokemonMove } from '@shared/services/pokemonApi';

export function loadBattle(world: World, pokemons: PokemonDetails[]) {
    // Registrar todos los storages de componentes
    const names = new ComponentStorage<NameComponent>();
    const healths = new ComponentStorage<HealthComponent>();
    const moves = new ComponentStorage<MoveComponent>();
    const sprites = new ComponentStorage<SpriteComponent>();
    const stats = new ComponentStorage<StatsComponent>();

    world.addComponentStorage('Name', names);
    world.addComponentStorage('Health', healths);
    world.addComponentStorage('Move', moves);
    world.addComponentStorage('Sprite', sprites);
    world.addComponentStorage('Stats', stats);

    // Usar la Factory para crear las entidades
    const factory = new PokemonEntityFactory(world);
    const entities = factory.createPokemonEntities(pokemons);

    console.log('⚔️ Combate cargado con:');
    for (const [id, name] of names.entries()) {
        const hp = healths.get(world.entityManager.getEntity(id)!);
        const statsData = stats.get(world.entityManager.getEntity(id)!);
        console.log(`- ${name.name} (HP: ${hp?.current}/${hp?.max}) - Stats: ATK:${statsData?.stats.attack} DEF:${statsData?.stats.defense} SPA:${statsData?.stats.specialAttack} SPD:${statsData?.stats.specialDefense} SPE:${statsData?.stats.speed}`);
    }
}