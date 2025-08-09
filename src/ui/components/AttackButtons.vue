<script setup lang="ts">
import { PokemonMove } from '@shared/services/pokemonApi'
import { capitalizeFirstLetter, titleCase } from '@shared/utils/utils'
import { useTooltip } from '../composables/useTooltip'
import GenericTooltip from './GenericTooltip.vue'
import MoveTooltip from './MoveTooltip.vue'

const props = defineProps<{
  moves: PokemonMove[]
  pokemonName: string
  pokemonHP: number
  pokemonMaxHP: number
}>()

const emit = defineEmits<{
  moveSelected: [move: PokemonMove]
}>()

const { tooltipVisible, tooltipX, tooltipY, tooltipContent, handleMouseEnter, handleMouseLeave } = useTooltip()

function handleMoveClick(move: PokemonMove) {
  emit('moveSelected', move)
}

function onMoveMouseEnter(event: MouseEvent, move: PokemonMove) {
  handleMouseEnter(event, move, { position: 'above', width: 250 })
}

function onMoveMouseLeave() {
  handleMouseLeave()
}
</script>

<template>
  <div class="attack-section">
    <div class="attack-header">
      <div class="attack-title">What will <b>{{ capitalizeFirstLetter(props.pokemonName) }}</b> do?</div>
      <div class="hp-display">HP {{ props.pokemonHP }}/{{ props.pokemonMaxHP }}</div>
    </div>
    <div class="attack-buttons">
      <button
        v-for="move in moves"
        :key="move.name"
        class="attack-btn"
        :class="move.type"
        @click="handleMoveClick(move)"
        @mouseenter="onMoveMouseEnter($event, move)"
        @mouseleave="onMoveMouseLeave"
      >
        <div class="move-name">{{ titleCase(move.name) }}</div>
        <div class="move-type">{{ move.type.toUpperCase() }}</div>
        <div class="move-pp">16/16</div>
      </button>
    </div>

    <GenericTooltip
      :visible="tooltipVisible"
      :x="tooltipX"
      :y="tooltipY"
      :content="tooltipContent"
    >
      <template #default="{ content }">
        <MoveTooltip v-if="content" :move="content" />
      </template>
    </GenericTooltip>
  </div>
</template>

<style scoped>
.attack-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f5f5f5;
    padding: 10px;
    border-top: 3px solid #ccc;
    max-width: 620px;
    margin: -5px auto 0 auto;
}

.attack-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 1em;
}

.attack-title {
    color: #333;
    font-size: 1.1em;
    font-family: 'Arial', sans-serif;
    flex: 1;
}

.hp-display {
    background-color: #e0e0e0;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.9em;
    font-weight: bold;
    color: #333;
    border: 1px solid #ccc;
    font-family: 'Arial', sans-serif;
}

@media (max-width: 768px) {
    .attack-title {
        display: none;
    }
}

.attack-buttons {
    display: flex;
    justify-content: space-around;
    width: 100%;
    gap: 5px;
}

.attack-btn {
    flex: 1;
    padding: 12px;
    font-size: 1em;
    font-weight: bold;
    border: 2px solid #000;
    cursor: pointer;
    transition: 0.2s;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60px;
}

@media (max-width: 768px) {
    .attack-btn {
        font-size: .5em;
        padding: 6px 2px;
    }
}

.move-name {
    font-size: 0.7em;
}

.move-type {
    font-size: 0.6em;
}

.move-pp {
    font-size: 0.55em;
}

/* Ajuste de colores por tipo de ataque */
.normal { background-color: #A8A878; color: #fff; }
.fire { background-color: #F08030; color: #fff; }
.water { background-color: #6890F0; color: #fff; }
.electric { background-color: #F8D030; color: #fff; }
.grass { background-color: #78C850; color: #fff; }
.ice { background-color: #98D8D8; color: #fff; }
.fighting { background-color: #C03028; color: #fff; }
.poison { background-color: #A040A0; color: #fff; }
.ground { background-color: #E0C068; color: #fff; }
.flying { background-color: #A890F0; color: #fff; }
.psychic { background-color: #F85888; color: #fff; }
.bug { background-color: #A8B820; color: #fff; }
.rock { background-color: #B8A038; color: #fff; }
.ghost { background-color: #705898; color: #fff; }
.dragon { background-color: #7038F8; color: #fff; }
.dark { background-color: #705848; color: #fff; }
.steel { background-color: #B8B8D0; color: #fff; }
.fairy { background-color: #EE99AC; color: #fff; }

/* Hover Effect */
.attack-btn:hover {
    filter: brightness(1.2);
}
</style> 