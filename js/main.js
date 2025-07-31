function showSection(targetId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    const targetElement = document.getElementById(targetId);
    if (targetElement) targetElement.classList.add('active');
    const targetButton = document.querySelector(`.tab-button[data-target="${targetId}"]`);
    if (targetButton) targetButton.classList.add('active');
}

function updateBuildMaker() {
    const lvl = parseInt(document.getElementById('bmLevelInput').value) || 0;
    const power = parseInt(document.getElementById('bmPower').value) || 0;
    const resis = parseInt(document.getElementById('bmResis').value) || 0;
    const intel = parseInt(document.getElementById('bmIntel').value) || 0;
    const dex = parseInt(document.getElementById('bmDex').value) || 0;

    let totalItemStats = { Damage: 0, Defense: 0, Wisdom: 0, HpBonus: 0, ManaBonus: 0, SpeedBonus: 0, "Damage%Bonus": 0, "Defense%Bonus": 0, "Hp%Bonus": 0, "Mana%Bonus": 0, "Wisdom%Bonus": 0, "Critical%": 0, "BlockChance%": 0 };
    let setPieces = {};
    let setStatsToBoost = { Damage: 0, Defense: 0, Wisdom: 0, HpBonus: 0, ManaBonus: 0 };
    const setSlots = ["Helmet", "Armor", "Legs", "Boots", "Gloves"];

    const useEquip = document.getElementById('equipToggle').checked;
    if (useEquip) {
        document.querySelectorAll('#equipment-section select[id^="eq"]').forEach(select => {
            const selectedIndex = select.selectedIndex;
            if (selectedIndex > 0) {
                const itemType = select.id.replace('eq', '');
                const item = { ...ITENS_DATABASE[itemType][selectedIndex] };
                item.stats = { ...item.stats };

                const raritySelect = document.getElementById(`rarity${itemType}`);
                const rarityModifier = RARITY_MODIFIERS[raritySelect.value];

                for (const stat in item.stats) {
                    if (!stat.includes('%')) {
                        item.stats[stat] *= (1 + rarityModifier);
                    }
                }
                
                if (item.set && item.set !== "Nenhum" && setSlots.includes(itemType)) {
                    setPieces[item.set] = (setPieces[item.set] || 0) + 1;
                    for (const stat in setStatsToBoost) {
                        if (item.stats[stat]) setStatsToBoost[stat] += item.stats[stat];
                    }
                }
                
                for (const [stat, value] of Object.entries(item.stats)) {
                     if (!item.set || item.set === "Nenhum" || !setSlots.includes(itemType) || !Object.keys(setStatsToBoost).includes(stat)) {
                        totalItemStats[stat] = (totalItemStats[stat] || 0) + value;
                    }
                }
            }
        });

        let hasFullSet = false;
        for (const setName in setPieces) {
            if (setPieces[setName] >= 5) {
                hasFullSet = true;
                break;
            }
        }

        const boost = hasFullSet ? 1.20 : 1.0;
        for (const stat in setStatsToBoost) {
             totalItemStats[stat] = (totalItemStats[stat] || 0) + (setStatsToBoost[stat] * boost);
        }
    }
    
    const finalPower = power;
    const finalResis = resis;
    const finalIntel = intel;
    const finalDex = dex;

    const hp = Formulas.health(lvl, finalResis, totalItemStats.HpBonus, totalItemStats["Hp%Bonus"]);
    const def = Formulas.defense(lvl, finalResis, totalItemStats.Defense, totalItemStats["Defense%Bonus"]);
    const dmg = Formulas.damage(lvl, finalPower, totalItemStats.Damage, totalItemStats["Damage%Bonus"]);
    const blp = Formulas.blockPen(finalPower);
    const mana = Formulas.mana(lvl, finalIntel, totalItemStats.ManaBonus, totalItemStats["Mana%Bonus"]);
    const critChance = Formulas.critChance(finalDex, totalItemStats["Critical%"]);
    const critMult = Formulas.critMultiplier(finalDex);
    const cdr = Formulas.cdr(finalDex, totalItemStats.SpeedBonus);
    const wisd = Formulas.wisdom(finalIntel, totalItemStats.Wisdom, totalItemStats["Wisdom%Bonus"]);

    document.getElementById('buildmakerResult').innerHTML = `
        <p><strong>Damage:</strong> ${Math.floor(dmg).toLocaleString()}</p>
        <p><strong>Defense:</strong> ${Math.floor(def).toLocaleString()}</p>
        <p><strong>Max. Health:</strong> ${Math.floor(hp).toLocaleString()}</p>
        <p><strong>Max. Mana:</strong> ${mana.toLocaleString()}</p>
        <p><strong>Critical Chance:</strong> ${critChance.toFixed(1)}%</p>
        <p><strong>Critical Multiplier:</strong> ${critMult.toFixed(2)}x</p>
        <p><strong>Cooldown Reduction:</strong> ${(cdr * 100).toFixed(1)}%</p>
        <p><strong>Block Penetration:</strong> ${blp.toFixed(1)}% / 20%</p>
        <p><strong>Wisdom (de pontos):</strong> ${Math.floor(wisd)}</p>
    `;
}

function updateFormulaCalculators() {
    if (!document.getElementById('formulas')) return;
    
    const danoGeral = parseFloat(document.getElementById('calcDanoGeral').value) || 0;
    const danoBaseSkill = parseFloat(document.getElementById('calcDanoBaseSkill').value) || 0;
    const dexterity = parseInt(document.getElementById('calcDexterity').value) || 0;
    const isCrit = document.getElementById('calcIsCrit').checked;
    
    let danoBrutoBase = danoBaseSkill + (danoGeral / 2) + (danoBaseSkill * danoGeral / 30);
    let finalDamage = danoBrutoBase;
    if (isCrit) {
        const critMult = 1.75 + (dexterity * 0.002);
        finalDamage = danoBrutoBase * critMult;
    }
    document.getElementById('skillDamageResult').innerHTML = `<p><strong>Dano Bruto do Golpe:</strong> ${Math.floor(finalDamage).toLocaleString()}</p>`;
    
    const nivelHp = parseInt(document.getElementById('calcNivelHp').value) || 0;
    const resistance = parseInt(document.getElementById('calcResistance').value) || 0;
    const hpFinal = Formulas.health(nivelHp, resistance, 0, 0);
    document.getElementById('hpResult').innerHTML = `<p><strong>HP Final (sem itens):</strong> ${hpFinal.toLocaleString()}</p>`;
}

const huntData = [
    { level: 1, name: "Chicken" }, { level: 3, name: "Wolf" }, { level: 5, name: "Worm" },
    { level: 15, name: "Puppet" }, { level: 20, name: "Toy Boy" }, { level: 30, name: "Shuran" },
    { level: 60, name: "Ice Fighter" }, { level: 90, name: "Elf" }, { level: 150, name: "Star Mobs" },
    { level: 200, name: "Moon Mobs" }, { level: 250, name: "Sun Mobs" }, { level: 300, name: "Samurais" },
    { level: 400, name: "Mugen Kamuijin" }, { level: 500, name: "Knight Mobs" }, { level: 600, name: "Sound Mobs" }
];
function findHunt() {
    const userLevel = parseInt(document.getElementById('huntLevel').value);
    if (isNaN(userLevel)) return;
    let bestHunt = null, nextHunt = null;
    for (const hunt of huntData) {
        if (hunt.level <= userLevel) bestHunt = hunt;
        else { nextHunt = hunt; break; }
    }
    let result = bestHunt ? `<p><strong>Recomendado:</strong> ${bestHunt.name} (Nível ${bestHunt.level})</p>` : `<p>Comece com os inimigos iniciais.</p>`;
    if (nextHunt) result += `<p><strong>Próxima Hunt:</strong> ${nextHunt.name} (Nível ${nextHunt.level})</p>`;
    const huntResult = document.getElementById('huntResult');
    huntResult.innerHTML = result;
    huntResult.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const targetId = event.currentTarget.getAttribute('data-target');
            if (targetId) showSection(targetId);
        });
    });

    const equipmentSection = document.getElementById('equipment-section');
    if (equipmentSection) {
        for (const type in ITENS_DATABASE) {
            const itemSelect = document.getElementById(`eq${type}`);
            const raritySelect = document.getElementById(`rarity${type}`);
            
            if(itemSelect) {
                ITENS_DATABASE[type].forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.nome;
                    option.textContent = item.nome;
                    itemSelect.appendChild(option);
                });
                itemSelect.addEventListener('change', updateBuildMaker);
            }
            if(raritySelect) {
                for(const rarity in RARITY_MODIFIERS) {
                    const option = document.createElement('option');
                    option.value = rarity;
                    option.textContent = rarity;
                    raritySelect.appendChild(option);
                }
                raritySelect.value = "Common";
                raritySelect.addEventListener('change', updateBuildMaker);
            }
        }
        document.getElementById('equipToggle').addEventListener('change', (e) => {
            equipmentSection.style.display = e.target.checked ? 'block' : 'none';
            updateBuildMaker();
        });
    }

    const allInputs = document.querySelectorAll('#buildmaker input, #formulas input');
    allInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (document.body.contains(document.getElementById('buildmaker'))) updateBuildMaker();
            if (document.body.contains(document.getElementById('formulas'))) updateFormulaCalculators();
        });
    });

    if (document.body.contains(document.getElementById('buildmaker'))) {
        updateBuildMaker();
        showSection('buildmaker');
    } else if (document.body.contains(document.getElementById('formulas'))) {
        updateFormulaCalculators();
    }
});