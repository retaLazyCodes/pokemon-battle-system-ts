# 📄 ECS Pokémon Battle Simulator

This project is a turn-based combat game inspired by Pokémon, developed in TypeScript. It follows an Entity-Component-System (ECS) architecture combined with an Observer / PubSub pattern (EventBus) to decouple game logic from the user interface.

## 🧬 ECS Entity & Component Model

### 🧩 Entities and Their Components

| Entity     | Description                   | Common Components                                        |
|------------|-------------------------------|----------------------------------------------------------|
| `Pokemon`  | Combat creature               | `Name`, `Health`, `Stats`, `Moves`, `Status`, `Sprite`  |
| `Player`   | Human trainer                 | `Trainer`, `Team`, `Input`                               |
| `Enemy`    | AI-controlled trainer         | `Trainer`, `Team`, `AI`                                  |
| `Battle`   | Current battle state/context  | `TurnOrder`, `Phase`, `BattleLog`                        |

---

### 🧱 Component Descriptions

| Component     | Purpose                                  | Example Properties                                       |
|---------------|------------------------------------------|----------------------------------------------------------|
| `Name`        | Pokémon's display name                   | `name: string`                                           |
| `Health`      | Tracks HP                                | `current: number`, `max: number`                         |
| `Stats`       | Battle stats                             | `attack`, `defense`, `speed`, etc.                       |
| `Moves`       | List of known moves                      | `moves: Move[]`                                          |
| `Status`      | Condition (e.g., paralysis, burn)        | `condition: string`, `turnsLeft: number`                 |
| `Sprite`      | Visual representation                    | `url: string`                                            |
| `Trainer`     | Player or enemy meta-info                | `name: string`, `activePokemonId: number`                |
| `Team`        | List of Pokémon in party                 | `pokemonIds: number[]`                                   |
| `TeamRef`     | Links Pokémon to trainer                 | `ownerId: number`                                        |
| `Input`       | Marks player-controlled trainer          | `enabled: boolean`                                       |
| `AI`          | Strategy logic for automated enemies     | `strategy: string`                                       |
| `TurnOrder`   | Turn queue                               | `current: number`, `queue: number[]`                     |
| `Phase`       | Current phase of the turn                | `value: INPUT \| 'EXECUTION' \| 'RESOLVE' \| 'END'`      |
| `BattleLog`   | Battle text history                      | `entries: string[]`                                      |

---

## ⚙️ Systems Overview

- `InputSystem`: Listens for user clicks and emits gameplay actions.
- `BattleSystem`: Coordinates the execution of each battle turn.
- `DamageSystem`: Calculates and applies damage, factoring in effectiveness.
- `StatusSystem`: Applies status effects (e.g., paralysis, poison, stat drops).
- `UIUpdateSystem`: Updates the health bars, action log, and other UI elements.
- `TurnSystem`: Controls the phase transitions of a turn (Input → Execute → Resolve → End).

---

## 🧱 Relationships Between Core Elements

### World
- Central hub of the ECS architecture.
- Manages:
  - `EntityManager`: Generates and deletes entities (IDs).
  - `ComponentStorage<T>`: Holds all component data by type.
- Provides access to component storage for systems.

### Entity
- An entity is just a numeric ID.
- Has no internal logic or structure.
- Composed entirely of components.

### Component
- Pure data structures, no logic.
- Represent state or attributes of an entity.
- Examples: `Health`, `Name`, `Moves`, `Status`, `Sprite`.

### System
- Contains game logic (e.g., damage calculation, input handling).
- Subscribes to events via `EventBus`.
- Reads/modifies entity components via `World`.

### EventBus
- Pub/Sub system used for decoupled communication.
- Emits and listens to events asynchronously.
- Used by systems and UI.

### SystemManager
- Manages registration and lifecycle of systems.

---

## 🔄 Data Flow – A Full Turn Breakdown

### Step-by-step

1. **Player input**
   - Clicks an attack button.
   - `InputSystem` captures DOM event and emits:
     ```ts
     eventBus.emit('playerAction', { type: 'attack', moveId })
     ```

2. **Battle execution**
   - `BattleSystem` receives `playerAction`.
   - Reads attacker and target components.
   - Calculates damage and emits:
     ```ts
     eventBus.emit('damageApplied', { targetId, damage })
     ```

3. **Damage resolution**
   - `DamageSystem` listens to `damageApplied`.
   - Updates `Health` component of target.
   - If HP <= 0:
     ```ts
     eventBus.emit('pokemonFainted', { entityId })
     ```

4. **Apply secondary effects**
   - `BattleSystem` emits:
     ```ts
     eventBus.emit('secondaryEffects', move.effects)
     ```
   - `StatusSystem`, `StatSystem` process them.

5. **UI update**
   - Events like `logUpdate`, `healthChanged` are emitted.
   - `UIUpdateSystem` listens and updates the view.
