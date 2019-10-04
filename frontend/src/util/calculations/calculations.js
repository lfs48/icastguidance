const toHitPerLevel = [4,4,4,5,6,6,6,7,8,8,8,9,10,10,10,10,11,11,12,12]

export const hitChance = (AC, level) => {
    const toHit = toHitPerLevel[level-1];
    return Math.min(1-((AC-toHit-1)/20),1);
};