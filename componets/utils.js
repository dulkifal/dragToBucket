import {  COLORS } from './constants';

export const createDot = () => {
  // pick random color and size
  const color = COLORS[Math.floor(Math.random() * COLORS.length)]
  const size =  45

  let x = Math.floor(Math.random() * 100);

  return {
    color,
    size,
    x,
    y: 0,
  }
};

export const removeDot = (dots, index) => {
  const newDots = [...dots];
  newDots.splice(index, 1);
  return newDots;
};

