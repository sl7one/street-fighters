import controls from '../../constants/controls';

export function getHitPower({ attack }) {
    // return hit power
    const criticalHitChance = Math.floor(Math.random() * 2) + 1;
    const power = attack * criticalHitChance;
    return power;
}

export function getBlockPower({ defense }) {
    // return block power
    const dodgeChance = Math.random() * 2 + 1;
    const power = defense * dodgeChance;
    return power;
}

export function getDamage(attacker, defender) {
    // return damage
    return getBlockPower(defender) > getHitPower(attacker) ? 0 : getHitPower(attacker) - getBlockPower(defender);
}

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        // resolve the promise with the winner when fight is over

        const {
            PlayerOneAttack,
            PlayerOneBlock,
            PlayerTwoAttack,
            PlayerTwoBlock,
            PlayerOneCriticalHitCombination,
            PlayerTwoCriticalHitCombination
        } = controls;

        const state = {
            idIntervalFirst: null,
            idIntervalSecond: null,
            flagFirts: true,
            flagSecond: true,
            healthFirstFighter: firstFighter.health,
            healthSecondFighter: secondFighter.health,
            healthBarFirstFighter: document.querySelector('#left-fighter-indicator'),
            healthBarSecondFighter: document.querySelector('#right-fighter-indicator'),
            damageToFirstFighter(damage) {
                this.healthFirstFighter -= damage;
                this.setHealthWidthFirstFighter();
            },
            damageToSecondFighter(damage) {
                this.healthSecondFighter -= damage;
                this.setHealthWidthSecondFighter();
            },
            setHealthWidthFirstFighter() {
                const initWidth = firstFighter.health;
                const dynamicWidth = this.healthFirstFighter / initWidth;
                this.healthBarFirstFighter.style.transition = 'all 250ms ease-in';
                this.healthBarFirstFighter.style.width = dynamicWidth <= 0 ? `${0}%` : `${dynamicWidth * 100}%`;
            },
            setHealthWidthSecondFighter() {
                const initWidth = secondFighter.health;
                const dynamicWidth = this.healthSecondFighter / initWidth;
                this.healthBarSecondFighter.style.transition = 'all 250ms ease-in';
                this.healthBarSecondFighter.style.width = dynamicWidth <= 0 ? `${0}%` : `${dynamicWidth * 100}%`;
            },
            setFirstFighterInterval() {
                this.flagFirts = false;
                this.idIntervalFirst = setInterval(() => this.setFlagFirst(), 10000);
            },
            setSecondFighterInterval() {
                this.flagSecond = false;
                this.idIntervalSecond = setInterval(() => this.setFlagSecond(), 10000);
            },
            setFlagFirst() {
                this.flagFirts = true;
            },
            setFlagSecond() {
                this.flagSecond = true;
            }
        };

        const pressed = new Set();
        const onKeyUp = ({ code }) => pressed.delete(code);

        function onKeyDown({ code }, cbResolve) {
            pressed.add(code);

            const getWinner = () => {
                const isFirstFighterWinner = state.healthFirstFighter > 0 && state.healthSecondFighter <= 0;
                const isSecondFighterWinner = state.healthSecondFighter > 0 && state.healthFirstFighter <= 0;
                const winner = (isFirstFighterWinner && firstFighter) || (isSecondFighterWinner && secondFighter);

                if (winner) {
                    cbResolve(winner);
                    document.removeEventListener('keyup', onKeyUp);
                    clearInterval(state.idIntervalFirst);
                    clearInterval(state.idIntervalSecond);
                    // document.removeEventListener('keydown', wrapper); //linter defining problem
                }
            };

            if (pressed.has(PlayerOneAttack) && pressed.has(PlayerOneBlock)) return; // A+D
            if (pressed.has(PlayerTwoBlock) && pressed.has(PlayerTwoAttack)) return; // J+L

            if (state.flagFirts) {
                const executeCriticalHit = () => {
                    if (
                        pressed.has(PlayerOneCriticalHitCombination[0]) &&
                        pressed.has(PlayerOneCriticalHitCombination[1]) &&
                        pressed.has(PlayerOneCriticalHitCombination[2])
                    ) {
                        const { attack } = firstFighter;
                        const damage = 2 * attack;
                        state.damageToSecondFighter(damage);
                        state.setFirstFighterInterval();
                        getWinner();
                    } // Q+W+E
                };

                executeCriticalHit();
            }

            if (state.flagSecond) {
                const executeCriticalHit = () => {
                    if (
                        pressed.has(PlayerTwoCriticalHitCombination[0]) &&
                        pressed.has(PlayerTwoCriticalHitCombination[1]) &&
                        pressed.has(PlayerTwoCriticalHitCombination[2])
                    ) {
                        const { attack } = secondFighter;
                        const damage = 2 * attack;
                        state.damageToFirstFighter(damage);
                        state.setSecondFighterInterval();
                        getWinner();
                    } // U+I+O
                };

                executeCriticalHit();
            }

            if (pressed.has(PlayerOneAttack) && pressed.has(PlayerTwoBlock)) {
                const damage = getDamage(firstFighter, secondFighter);
                state.damageToSecondFighter(damage);
                getWinner();
                return;
            } // A+L
            if (pressed.has(PlayerTwoAttack) && pressed.has(PlayerOneBlock)) {
                const damage = getDamage(secondFighter, firstFighter);
                state.damageToFirstFighter(damage);
                getWinner();
                return;
            } // J+D
            if (pressed.has(PlayerOneAttack)) {
                const damage = getHitPower(firstFighter);
                state.damageToSecondFighter(damage);
                getWinner();
                return;
            } // A
            if (pressed.has(PlayerTwoAttack)) {
                const damage = getHitPower(secondFighter);
                state.damageToFirstFighter(damage);
                getWinner();
            } // J
        }
        function wrapper(e) {
            return onKeyDown(e, resolve);
        }

        document.addEventListener('keydown', wrapper);
        document.addEventListener('keyup', onKeyUp);
    });
}
