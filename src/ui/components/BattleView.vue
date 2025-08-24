<script setup lang="ts">
import BattleScene from './BattleScene.vue'
import AttackButtons from './AttackButtons.vue'
import { PokemonMove } from '@shared/services/pokemonApi'
import { World } from '@game/ecs/World'
import { Entity } from '@game/ecs/Entity'

const props = defineProps<{
  world: World
  playerEntity: Entity
  enemyEntity: Entity
  background?: string
}>()

const emit = defineEmits<{
  moveSelected: [move: PokemonMove]
}>()

// Extraer información de las entidades usando el sistema ECS
const playerName = props.world.getStorage('Name').get(props.playerEntity)?.name ?? 'Unknown'
const enemyName = props.world.getStorage('Name').get(props.enemyEntity)?.name ?? 'Unknown'
const playerHealth = props.world.getStorage('Health').get(props.playerEntity)
const playerMoves = props.world.getStorage('Move').get(props.playerEntity)?.moves ?? []
const playerSprite = props.world.getStorage('Sprite').get(props.playerEntity)?.backSprite ?? ''
const playerIcon = props.world.getStorage('Sprite').get(props.playerEntity)?.iconSprite ?? ''
const enemySprite = props.world.getStorage('Sprite').get(props.enemyEntity)?.frontSprite ?? ''
const playerStats = props.world.getStorage('Stats').get(props.playerEntity)


// Convertir los movimientos del ECS al formato esperado por la UI
const playerMovesFormatted: PokemonMove[] = playerMoves.map((move, index) => ({
  id: move.id,
  name: move.name,
  power: move.power,
  accuracy: move.accuracy,
  type: move.type,
  category: move.category,
  index: index
}))

function handleMoveSelected(move: PokemonMove) {
  emit('moveSelected', move)
}
</script>

<template>
  <div>
    <BattleScene
      :playerSprite="playerSprite"
      :enemySprite="enemySprite"
      :background="props.background"
      :playerName="playerName"
      :enemyName="enemyName"
    />
    <AttackButtons 
      :moves="playerMovesFormatted"
      :pokemonName="playerName"
      :pokemonHP="playerHealth?.current ?? 0"
      :pokemonMaxHP="playerHealth?.max ?? 0"
      @moveSelected="handleMoveSelected"
    />
  </div>
</template>