import { Stats } from './statsUtils';

export class PokemonUtils {
    static LEVEL = 100;
	
	constructor(
		types: any[], // # TODO: Implementar componente Type
		attack: number, 
		defense: number, 
		spAttack: number, 
		spDefense: number, 
		speed: number
	) {
		this._level = PokemonUtils.LEVEL;
		
		// Stats con valores reales calculados
		this.stats = new Stats(
			attack, defense,
			spAttack, spDefense,
			speed, this._level
		);

		
		this._types = [];

		// Init types
		for (let i=0; i < types.length; i++) {
			// this._types.push(TypeFactory.getType(types[i]));
			this._types.push(types[i]);
		}

	}

	private _level: number;
	private _types: any[];
	public stats: Stats;

	static calculateMaxHP(baseHP: number): number {
		return Math.floor(((2 * baseHP * PokemonUtils.LEVEL) / 100) + PokemonUtils.LEVEL + 10);
	}


    static calculateDamage(attackerStats: any, target: any, move: any, isCritical = false): number {
		const attackType = move.type;
		let attackerAttack = 0;
		let defenderDefense = 0;

		if (move.category === 'physical') {
			attackerAttack = attackerStats.attack;
			defenderDefense = target.stats.defense;
		} else if (move.category === 'special') {
			attackerAttack = attackerStats.specialAttack;
			defenderDefense = target.stats.specialDefense;
		}

		const CRIT_MULTIPLIER = 1.5;
		const attackerMovePower = move.power;
		const attackerLevel = PokemonUtils.LEVEL;
		// const effectiveness = attackType.calculateEffectiveness(target._types);
		const effectiveness = 1; // Temporalmente
		const stab = this.calculateSTAB(move);
		const criticalMultiplier = isCritical ? CRIT_MULTIPLIER : 1;
		
		// Fórmula de calculo de daño
		return Math.floor(
			(((2 * attackerLevel / 5 + 2) * attackerMovePower * (attackerAttack / defenderDefense)) / 50 + 2)
			* effectiveness
			* stab
			* criticalMultiplier
		);
	}

	static calculateSTAB(move: any): number {
		const STAB_MULTIPLIER = 1.5;
        return 1;
		// return this._types.some((type: any) => type === move.type) ? STAB_MULTIPLIER : 1;
	}

	static calculateCriticalHit(): boolean {
		// Genera un número entre 0 y 99,9999, y si es menor que 4.17, ocurre un golpe crítico.
		const critChance = 4.17;
		return Math.random() * 100 < critChance;
	}
}