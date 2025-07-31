const ITENS_DATABASE = {
    Sword: [
        { nome: "Nenhuma", set: null, stats: {} },
        { nome: "Easter Blade Top", set: null, stats: { Damage: 535*2, Wisdom: 90, "Damage%Bonus": 0.02, "Critical%": 0.02 } },
    ],
    Helmet: [
        { nome: "Nenhum", set: "Nenhum", stats: {} },
        { nome: "Sound Helmet", set: "Sound", stats: { Defense: 165, Wisdom: 20, "Damage%Bonus": 0.01, "Defense%Bonus": 0.01 } },
    ],
    Armor: [
        { nome: "Nenhuma", set: "Nenhum", stats: {} },
        { nome: "Sound Armor", set: "Sound", stats: { ManaBonus: 2500, Defense: 330, Wisdom: 20, "Damage%Bonus": 0.01, "BlockChance%": 0.01, "Defense%Bonus": 0.005, "Wisdom%Bonus": 0.01 } },
    ],
    Legs: [
        { nome: "Nenhuma", set: "Nenhum", stats: {} },
        { nome: "Sound Legs", set: "Sound", stats: { Defense: 145, "Wisdom%Bonus": 0.01, "BlockChance%": 0.01 } },
    ],
    Boots: [
        { nome: "Nenhuma", set: "Nenhum", stats: {} },
        { nome: "Sound Slippers", set: "Sound", stats: { ManaBonus: 500, Damage: 10, Defense: 130, Wisdom: 20 } },
    ],
    Gloves: [
        { nome: "Nenhuma", set: "Nenhum", stats: {} },
        { nome: "Sound Gloves", set: "Sound", stats: { ManaBonus: 500, Damage: 60, Defense: 95, Wisdom: 20, "Damage%Bonus": 0.01 } },
    ],
    Ring: [
        { nome: "Nenhum", set: null, stats: {} },
        { nome: "Frozen Ring", set: null, stats: { Damage: 30, Defense: 20, Wisdom: 30, "Damage%Bonus": 0.01 } },
    ],
    Amulet: [
        { nome: "Nenhum", set: null, stats: {} },
        { nome: "Sound Amulet", set: null, stats: { Damage: 20, Defense: 50, Wisdom: 10, "Defense%Bonus": 0.02 } },
    ]
};

const RARITY_MODIFIERS = {
    Broken: -0.20,
    Bad: -0.05,
    Common: 0.0,
    Uncommon: 0.05,
    Rare: 0.10,
    Epic: 0.20,
    Legendary: 0.25
};