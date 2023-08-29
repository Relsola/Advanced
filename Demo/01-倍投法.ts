/**
 * @description: 倍投法计算Demo
 * @param {number} principal 本金 默认 10000
 * @param {number} wager 一次的赌注 默认 200
 * @param {number} p 胜率 0 - 1 之间 默认 0.5
 * @param {number} n 倍投倍率 默认2倍
 * @param {number} num 游戏次数，默认100次 
 * @param {boolean} liability 是否开启负债 本金 <=0 立马结束 默认关闭
 * @return {number} 最终结果 
 */
const MultiplicationMethod = (principal: number = 10000, wager: number = 200, p: number = .5, n: number = 2, num: number = 100, liability: boolean = false): number => {
    // 当前赌金
    let Bets: number = wager;

    while (num > 0 && (liability ? true : principal > 0)) {
        // 是否胜利
        const win: boolean = Math.random() < p;
        // 本金变化
        principal = principal + (win ? Bets : -Bets);
        // 赌注变化
        Bets = win ? wager : Bets * n;
        num--;
    }
    return principal;
};

let num = 20;
let win = 0, _ = 0, max = 10000, min = 10000, principal;
while (num > 0) {
    principal = MultiplicationMethod(10000, 200, 0.5, 2, 100, true)
    if (num === 20) min = max = principal;
    max = Math.max(max, principal);
    min = Math.min(min, principal);
    if (principal > 10000) win++
    if (principal < 10000) _++
    num--
};
console.log(`不开启负债，20次倍投，本金10000，初始赌注200，胜率50%，最多赌100次，赢了${win}次，输了${_}次，最高${max},最低${min}`);