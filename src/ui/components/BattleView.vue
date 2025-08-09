<script setup lang="ts">
import BattleScene from './BattleScene.vue'
import AttackButtons from './AttackButtons.vue'
import { PokemonMove } from '@shared/services/pokemonApi'

const props = defineProps<{
  playerSprite: string
  enemySprite: string
  background?: string
  playerName: string
  enemyName: string
  playerMoves: PokemonMove[]
  playerHP: number
  playerMaxHP: number
}>()

const emit = defineEmits<{
  moveSelected: [move: PokemonMove]
}>()

function handleMoveSelected(move: PokemonMove) {
  emit('moveSelected', move)
}
</script>

<template>
  <div>
    <BattleScene
      :playerSprite="props.playerSprite"
      :enemySprite="props.enemySprite"
      :background="props.background"
      :playerName="props.playerName"
      :enemyName="props.enemyName"
    />
    <AttackButtons 
      :moves="props.playerMoves"
      :pokemonName="props.playerName"
      :pokemonHP="props.playerHP"
      :pokemonMaxHP="props.playerMaxHP"
      @moveSelected="handleMoveSelected"
    />
  </div>
</template>