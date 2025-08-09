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
      :playerSprite="pokemon1?.images.back ?? ''"
      :enemySprite="pokemon2?.images.front ?? ''"
      :playerName="pokemon1?.name ?? ''"
      :enemyName="pokemon2?.name ?? ''"
      :playerMoves="pokemon1?.moves || []"
      :playerHP="pokemon1?.stats.hp ?? 100"
      :playerMaxHP="pokemon1?.stats.hp ?? 100"
      @moveSelected="handleMoveSelected"
    />
  </div>
</template>