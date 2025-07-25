<script setup lang="ts">
const props = defineProps<{
  playerSprite: string
  enemySprite: string
  background?: string
}>()
</script>

<template>
  <div class="battle" :style="{ backgroundImage: `url('${props.background || '/assets/img/bg-forest.jpeg'}')` }">
    <div class="pokemon player-pokemon">
      <img :src="props.playerSprite" alt="Pokémon del Jugador" />
    </div>
    <div class="pokemon enemy-pokemon">
      <img :src="props.enemySprite" alt="Pokémon Enemigo" />
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