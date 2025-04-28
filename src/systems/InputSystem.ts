import { EventBus } from '@core/EventBus';
import { System } from '@ecs/System';

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
                moveId
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
