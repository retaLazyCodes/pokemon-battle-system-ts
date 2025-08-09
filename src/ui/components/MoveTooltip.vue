<script setup lang="ts">
import { PokemonMove } from '@shared/services/pokemonApi'
import { titleCase } from '@shared/utils/utils'

const props = defineProps<{
  move: PokemonMove
}>()

function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
  }
  return colors[type] || '#A8A878'
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    physical: '⚔️',
    special: '👁️',
    status: '💫'
  }
  return icons[category] || '❓'
}
</script>

<template>
  <div class="move-tooltip-content">
    <div class="tooltip-header">
      <h3 class="move-name">{{ titleCase(move.name) }}</h3>
    </div>

    <div class="tooltip-icons">
      <div
        class="type-badge"
        :style="{ backgroundColor: getTypeColor(move.type) }"
      >
        {{ move.type.toUpperCase() }}
      </div>
      <div class="category-icon">
        {{ getCategoryIcon(move.category) }}
      </div>
    </div>

    <div class="tooltip-stats">
      <div class="stat-line">
        <span class="stat-label">Base power:</span>
        <span class="stat-value">{{ move.power || '—' }}</span>
      </div>
      <div class="stat-line">
        <span class="stat-label">Accuracy:</span>
        <span class="stat-value">{{ move.accuracy || '—' }}%</span>
      </div>
    </div>

    <div class="tooltip-effect" v-if="move.power">
      <span class="effect-text">Lorem ipsum</span>
    </div>
  </div>
</template>

<style scoped>
.move-tooltip-content {
  min-width: 200px;
}

.tooltip-header {
  margin-bottom: 8px;
}

.move-name {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.tooltip-icons {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  align-items: center;
}

.type-badge {
  padding: 2px 6px;
  border-radius: 4px;
  color: white;
  font-size: 10px;
  font-weight: bold;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
}

.category-icon {
  font-size: 16px;
  background-color: #4a90e2;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.tooltip-stats {
  margin-bottom: 8px;
}

.stat-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
}

.stat-label {
  color: #666;
  font-size: 12px;
}

.stat-value {
  font-weight: bold;
  color: #333;
  font-size: 12px;
}

.tooltip-effect {
  border-top: 1px solid #ddd;
  padding-top: 6px;
}

.effect-text {
  font-size: 11px;
  color: #666;
  font-style: italic;
}
</style> 