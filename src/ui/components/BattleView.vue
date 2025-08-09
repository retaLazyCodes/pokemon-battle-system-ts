<script setup lang="ts">
import BattleScene from './BattleScene.vue'

const props = defineProps<{
  playerSprite: string
  enemySprite: string
  background?: string
  playerName: string
  enemyName: string
}>()
</script>

<template>
  <BattleScene
    :playerSprite="props.playerSprite"
    :enemySprite="props.enemySprite"
    :background="props.background"
    :playerName="props.playerName"
    :enemyName="props.enemyName"
  />
</template>