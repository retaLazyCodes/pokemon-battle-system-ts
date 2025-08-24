import { World } from '@game/ecs/World';
import { Entity } from '@game/ecs/Entity';
import { NameComponent } from '@game/components/NameComponent';
import { HealthComponent } from '@game/components/HealthComponent';
import { MoveComponent, MoveCategory } from '@game/components/MoveComponent';
import { SpriteComponent } from '@game/components/SpriteComponent';
import { StatsComponent } from '@game/components/StatsComponent';
import { Stats } from '@shared/utils/statsUtils';
import { PokemonDetails, PokemonMove } from '@shared/services/pokemonApi';
import { PokemonUtils } from '@shared/utils/pokemonUtils';

export class PokemonEntityFactory {
    private world: World;

    constructor(world: World) {
        this.world = world;
    }

    /**
     * Crea una entidad Pokémon completa con todos sus componentes
     */
    createPokemonEntity(pokemon: PokemonDetails): Entity {
        const entity = this.world.entityManager.createEntity();
        
        // Crear y agregar todos los componentes
        this.addNameComponent(entity, pokemon.name);
        this.addHealthComponent(entity, pokemon.stats.hp);
        this.addMoveComponent(entity, pokemon.moves);
        this.addSpriteComponent(entity, pokemon.images);
        this.addStatsComponent(entity, pokemon.stats);
        
        return entity;
    }

    /**
     * Crea múltiples entidades Pokémon
     */
    createPokemonEntities(pokemons: PokemonDetails[]): Entity[] {
        return pokemons.map(pokemon => this.createPokemonEntity(pokemon));
    }

    private addNameComponent(entity: Entity, name: string): void {
        const nameStorage = this.world.getStorage<NameComponent>('Name');
        nameStorage.add(entity, new NameComponent(name));
    }

    private addHealthComponent(entity: Entity, baseHP: number): void {
        const healthStorage = this.world.getStorage<HealthComponent>('Health');
        const maxHP = Stats.calculateMaxHP(baseHP, PokemonUtils.LEVEL);
        healthStorage.add(entity, new HealthComponent(maxHP, maxHP));
    }

    private addMoveComponent(entity: Entity, moves: PokemonMove[]): void {
        const moveStorage = this.world.getStorage<MoveComponent>('Move');
        const formattedMoves = moves.map((move: PokemonMove, index: number) => ({
            id: move.id,
            name: move.name,
            power: move.power,
            accuracy: move.accuracy,
            type: move.type,
            category: move.category as MoveCategory,
            index: index
        }));
        moveStorage.add(entity, new MoveComponent(formattedMoves));
    }

    private addSpriteComponent(entity: Entity, images: any): void {
        const spriteStorage = this.world.getStorage<SpriteComponent>('Sprite');
        spriteStorage.add(entity, new SpriteComponent(
            images.front,
            images.back,
            images.icon
        ));
    }

    private addStatsComponent(entity: Entity, baseStats: any): void {
        const statsStorage = this.world.getStorage<StatsComponent>('Stats');
        const calculatedStats = new Stats(
            baseStats.attack,
            baseStats.defense,
            baseStats.specialAttack,
            baseStats.specialDefense,
            baseStats.speed,
            PokemonUtils.LEVEL
        );
        statsStorage.add(entity, new StatsComponent(calculatedStats));
    }
}
