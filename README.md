# 🎮 Pokémon Battle System

Un simulador de combate Pokémon desarrollado con **TypeScript** y **Vue 3**, implementando una arquitectura **ECS (Entity Component System)** para una gestión eficiente del estado del juego.

## 🚀 Características

- **Sistema ECS**: Arquitectura modular para entidades, componentes y sistemas
- **Event-Driven**: Sistema de eventos para comunicación entre componentes
- **Vue 3 + TypeScript**: Interfaz moderna con tipado fuerte
- **Arquitectura Modular**: Separación clara entre lógica de juego, UI y servicios

## 📁 Estructura del Proyecto

```
src/
├── game/                   # Lógica del juego
│   ├── ecs/               # Sistema ECS base (Component, Entity, World, etc.)
│   ├── components/        # Componentes ECS específicos del juego (Health, Name, Move, etc.)
│   ├── systems/           # Sistemas ECS (Battle, Damage, Input, etc.)
│   ├── scenes/            # Escenas del juego
│   ├── mock/              # Datos de prueba (mocks)
│   ├── core/              # Core del juego (Game, Engine, EventBus)
│   ├── data/              
│   └── types/             
├── ui/                     # Lógica del UI
│   ├── App.vue            # Componente raíz de la aplicación
│   ├── components/        # Componentes Vue
│   ├── core/              
│   ├── composables/       
│   ├── types/             
│   └── data/              
├── shared/                 # Código compartido
│   ├── services/          # Servicios (API, etc.)
│   ├── utils/             
│   └── types/             
└── main.ts                 # Entrypoint de la app
```

## 🏗️ Arquitectura

### ECS (Entity Component System)

El proyecto utiliza una arquitectura ECS que separa:

- **Entities**: Objetos del juego (Pokémon)
- **Components**: Datos puros (salud, nombre, movimientos)
- **Systems**: Lógica que procesa componentes

### Event-Driven Architecture

- **EventBus**: Sistema central de eventos
- **Loose Coupling**: Componentes se comunican vía eventos
- **Reactive Updates**: UI se actualiza automáticamente

### Separación de Responsabilidades

- **Game**: Lógica de negocio del juego
- **UI**: Presentación y interacción
- **Shared**: Servicios y utilidades compartidas

## 🛠️ Tecnologías

- **TypeScript**: Tipado estático
- **Vue 3**: Framework de UI
- **Vite**: Build tool y dev server

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/retaLazyCodes/pokemon-battle-system-ts
cd pokemon-battle-system-ts

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

## 📖 Uso

### Frontend (Este repositorio)
1. **Iniciar el servidor**: `npm run dev`
2. **Abrir navegador**: `http://localhost:5173`
3. **Ver la batalla**: La aplicación cargará automáticamente una batalla de prueba

### Backend (API Proxy)
Este proyecto consume datos de una API Rest que actúa como proxy de la PokéAPI:

- **Repositorio**: [pokemon-battle-system-server](https://github.com/retaLazyCodes/pokemon-battle-system-server)
- **Funcionalidad**: Scrapea datos de PokeAPI y los almacena en SQLite
- **Ventajas**: Evita límites de uso y bans de la API pública
- **Endpoints**: Expone endpoints simples para consumir desde el frontend

## 🔧 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
```

## 🔄 Flujo de Datos

1. **Inicialización**: `Game` carga entidades y componentes
2. **Sistemas**: Procesan componentes y emiten eventos
3. **EventBus**: Distribuye eventos a componentes
4. **UI**: Reacciona a eventos y actualiza vista

## 🎨 Path Mappings

El proyecto usa alias para importaciones limpias:

```typescript
// Game
import { EventBus } from '@game/core/EventBus'
import { World } from '@game/ecs/World'
import { HealthComponent } from '@game/components/HealthComponent'

// UI
import BattleView from '@ui/components/BattleView.vue'
import { BattleUI } from '@ui/core/BattleUI'

// Shared
import { PokemonDetails } from '@shared/services/pokemonApi'
```

## 🤝 Contribuir

1. Forkeá el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.
