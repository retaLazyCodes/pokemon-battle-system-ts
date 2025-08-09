<template>
  <div
    v-if="visible"
    class="generic-tooltip"
    :style="{ left: `${x}px`, top: `${y}px` }"
  >
    <slot :content="content" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean
  x: number
  y: number
  content: any
}>()
</script>

<style scoped>
.generic-tooltip {
  position: fixed;
  background-color: #f8f8f8;
  border: 2px solid #333;
  border-radius: 8px;
  padding: 12px;
  min-width: 200px;
  max-width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  font-family: 'Arial', sans-serif;
  font-size: 14px;
}
</style> 