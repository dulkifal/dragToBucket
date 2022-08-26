import { atom } from 'recoil';
// Control params - if game is launched and current speed
export const controlOptions = atom({
  key: 'controlOptions',
  default: {
    isRunning: false,
    speed: 5,
  },
});
// List of dots in the game - empty by default
export const dotsState = atom({
  key: 'dotsState',
  default: [],
});
// Current score - zero by default
export const scoreState = atom({
  key: 'scoreState',
  default: 0,
});