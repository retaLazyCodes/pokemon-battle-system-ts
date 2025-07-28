<script setup lang="ts">
import BattleSprites from './BattleSprites.vue'

const props = defineProps<{
  playerSprite: string
  enemySprite: string
  background?: string
}>()
</script>

<template>
  <BattleSprites
    :playerSprite="props.playerSprite"
    :enemySprite="props.enemySprite"
    :background="props.background"
  />
</template>