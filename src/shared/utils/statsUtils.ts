export class Stats {
    public baseAttack: number;
    public baseDefense: number;
    public baseSpAttack: number;
    public baseSpDefense: number;
    public baseSpeed: number;
    
    public attack: number;
    public defense: number;
    public specialAttack: number;
    public specialDefense: number;
    public speed: number;

    constructor(baseAttack: number, baseDefense: number, baseSpAttack: number, baseSpDefense: number, baseSpeed: number, level: number) {
        this.baseAttack = baseAttack;
        this.baseDefense = baseDefense;
        this.baseSpAttack = baseSpAttack;
        this.baseSpDefense = baseSpDefense;
        this.baseSpeed = baseSpeed;

        // Calculamos solo los stats de combate
        this.attack = this.calculateStat(baseAttack, level);
        this.defense = this.calculateStat(baseDefense, level);
        this.specialAttack = this.calculateStat(baseSpAttack, level);
        this.specialDefense = this.calculateStat(baseSpDefense, level);
        this.speed = this.calculateStat(baseSpeed, level);
    }

    // Método para calcular HP máximo (usado por HealthComponent)
    static calculateMaxHP(baseHP: number, level: number): number {
        return Math.floor(((2 * baseHP * level) / 100) + level + 10);
    }

    calculateStat(baseStat: number, level: number): number {
        return Math.floor(((2 * baseStat * level) / 100) + 5);
    }
}