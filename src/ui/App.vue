<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Game } from '@game/core/Game'
import BattleView from './components/BattleView.vue'
import { PokemonAPI, PokemonDetails, PokemonMove } from '@shared/services/pokemonApi'

let game: Game
const loading = ref(true)
const pokemon1 = ref<PokemonDetails | null>(null)
const pokemon2 = ref<PokemonDetails | null>(null)

function handleMoveSelected(move: PokemonMove) {
  console.log(`Movimiento seleccionado: ${move.name}`)
  console.log(move)
  // Emitir evento al eventBus para procesar la acción del jugador
  if (game) {
    game.eventBus.emit('playerAction', {
      type: 'attack',
      moveIndex: move.index
    })
  }
}

onMounted(async () => {
  pokemon1.value = await PokemonAPI.getRandomPokemon()
  pokemon2.value = await PokemonAPI.getRandomPokemon()
  loading.value = false
  if (pokemon1.value && pokemon2.value) {
    game = new Game()
    game.start([pokemon1.value, pokemon2.value])
  }
})

</script>

<template>
  <div>
    <div v-if="loading">Loading Pokémon...</div>
    <BattleView
      v-else
      :world="game?.world"
      :playerEntity="game?.world?.entityManager.getEntity(0)"
      :enemyEntity="game?.world?.entityManager.getEntity(1)"
      @moveSelected="handleMoveSelected"
    />
  </div>
</template>