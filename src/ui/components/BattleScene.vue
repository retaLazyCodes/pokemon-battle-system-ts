<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  playerSprite: string
  enemySprite: string
  background?: string
  playerName: string
  enemyName: string
}>()

const playerImg = ref(props.playerSprite)
const enemyImg = ref(props.enemySprite)
const playerName = ref(props.playerName)
const enemyName = ref(props.enemyName)

watch(() => props.playerSprite, val => playerImg.value = val)
watch(() => props.enemySprite, val => enemyImg.value = val)

function getFallbackUrl(name: string, isBack: boolean) {
  const pokemonName = name.replace('-', '')
  return `https://play.pokemonshowdown.com/sprites/ani${isBack ? '-back' : ''}/${pokemonName}.gif`
}

function onPlayerError() {
  playerImg.value = getFallbackUrl(playerName.value, true)
}

function onEnemyError() {
  enemyImg.value = getFallbackUrl(enemyName.value, false)
}
</script>

<template>
  <div class="battle" :style="{ backgroundImage: `url('${props.background || '/assets/img/bg-forest.jpeg'}')` }">
    <div class="pokemon player-pokemon">
      <img :src="playerImg" @error="onPlayerError" alt="Pokémon del Jugador" />
    </div>
    <div class="pokemon enemy-pokemon">
      <img :src="enemyImg" @error="onEnemyError" alt="Pokémon Enemigo" />
    </div>
  </div>
</template>

<style scoped>
.battle {
  position: relative;
  width: 640px;
  height: 360px;
  background-size: 140%;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 auto;
}
.pokemon {
  position: absolute;
}
.player-pokemon {
  left: 25%;
  bottom: 15%;
  transform: scale(1.5);
}
.enemy-pokemon {
  right: 25%;
  top: 35%;
}
</style>