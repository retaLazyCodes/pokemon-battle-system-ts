import { EventBus } from '@game/core/EventBus';
import { System } from '@game/ecs/System';

/**
 * InputSystem
 * --------------------------------------------------------------------------
 * This system listens for player inputs from the UI.
 * Its only responsibility is to capture user interactions
 * (such as clicks on attack or switch buttons) and emit
 * high-level actions through the EventBus.
 * 
 * It should NOT contain any battle state logic like attackerId or targetId.
 * The current battle state is handled by BattleSystem.
 *
 * Responsibilities:
 * - Listen to DOM events (clicks on buttons).
 * - Emit player actions like "attack" or "switch" with minimal payload.
 * - Do NOT store any state about which Pokémon is active.
 *
 * Emits:
 * - `playerAction` event: { type: 'attack', moveIndex: number }
 * - `playerAction` event: { type: 'switch', pokemonId: number }
*/

export class InputSystem extends System {
    private eventBus: EventBus;

    constructor(eventBus: EventBus) {
        super();
        this.eventBus = eventBus;
    }

    init() {
        console.log('🎮 InputSystem initialized.');

        // Escuchar clicks en botones de ataque
        const attackButtons = document.querySelectorAll('[data-action="attack"]');
        attackButtons.forEach(button => {
            button.addEventListener('click', this.handleAttackClick);
        });

        // Escuchar clicks en botones de cambiar Pokémon
        const switchButtons = document.querySelectorAll('[data-action="switch"]');
        switchButtons.forEach(button => {
            button.addEventListener('click', this.handleSwitchClick);
        });
    }

    private handleAttackClick = (event: Event) => {
        const target = event.target as HTMLElement;
        const moveId = target.dataset.moveId;

        if (moveId) {
            console.log(`🎯 InputSystem: Attack selected -> ${moveId}`);
            this.eventBus.emit('playerAction', {
                type: 'attack',
                moveIndex: moveId
            }); 
        }
    };

    private handleSwitchClick = (event: Event) => {
        const target = event.target as HTMLElement;
        const pokemonId = target.dataset.pokemonId;

        if (pokemonId) {
            console.log(`🔄 InputSystem: Switch selected -> ${pokemonId}`);
            this.eventBus.emit('playerAction', {
                type: 'switch',
                pokemonId
            });
        }
    };

    destroy() {
        // Opcional: remover listeners si necesitás limpiar
        const attackButtons = document.querySelectorAll('[data-action="attack"]');
        attackButtons.forEach(button => {
            button.removeEventListener('click', this.handleAttackClick);
        });

        const switchButtons = document.querySelectorAll('[data-action="switch"]');
        switchButtons.forEach(button => {
            button.removeEventListener('click', this.handleSwitchClick);
        });
    }
}
