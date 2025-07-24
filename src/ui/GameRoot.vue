<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Game } from '../core/Game'
import BattleScreen from './BattleScreen.vue'

let game: Game

onMounted(() => {
  game = new Game()
  game.start()
})

</script>

<template>
  <div>
    <BattleScreen />
  </div>
</template>