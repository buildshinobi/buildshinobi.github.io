// Fórmulas - Se você está olhando esse arquivo, você é bem curioso, né?
// Que tal largar a curiosidade e me buscar no jogo para conversarmos...
// Nobre seu objetivo de encontrar as fórmulas do jogo, mas esse site serve
//  justamente para isso, expôr as fórmulas.
// Aliás, se eu fosse você, parava de fuçar no código dos outros rs
// Se você sabe o que está fazendo fuçando esse site, me procure no jogo!

const Formulas = {
    health: (lvl, res, hp_itens, hp_perc_itens) => {
        const baseHp = 100 + 10 * (lvl - 1);
        const bonusHp = res * baseHp * 0.03825;
        const totalBase = baseHp + bonusHp + hp_itens;
        return Math.floor(totalBase * (1 + hp_perc_itens));
    },
    defense: (lvl, res, def_itens, def_perc_itens) => {
        const baseDef = lvl * 0.542;
        const resDef = res * 0.225;
        const totalBase = baseDef + resDef + def_itens;
        return Math.floor(totalBase * (1 + def_perc_itens));
    },
    damage: (lvl, pow, dano_itens, dano_perc_itens) => {
        const lvlDmg = lvl * 0.5;
        const powDmg = pow * 1.125;
        const totalBase = lvlDmg + powDmg + dano_itens;
        return Math.floor(totalBase * (1 + dano_perc_itens));
    },
    blockPen: (pow) => Math.min(pow * 0.05, 20),
    mana: (lvl, intel, mana_itens, mana_perc_itens) => {
        const baseMana = 100 + lvl * 4.5;
        const bonusMana = intel * 1.8;
        const totalBase = baseMana + bonusMana + mana_itens;
        return Math.floor(totalBase * (1 + mana_perc_itens));
    },
    critChance: (dex, crit_perc_itens) => {
        const baseCritChance = 26.0;
        const dexCritChance = dex * 0.3;
        const itemCritChance = crit_perc_itens * 100;
        return baseCritChance + dexCritChance + itemCritChance;
    },
    critMultiplier: (dex) => 1.75 + (dex * 0.002),
    cdr: (dex, speed_itens) => {
        const speed = (dex * 0.01) + speed_itens;
        return speed / (speed + 8);
    },
    wisdom: (intel, wisdom_itens, wisdom_perc_itens) => {
        const baseWisdom = 0 + intel + wisdom_itens;
        return Math.floor(baseWisdom * (1 + wisdom_perc_itens));
    }
};
