import React, { useCallback, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

import { controlOptions, dotsState, scoreState } from '../componets/atom';
import { SPEED_STEP, SPAWN_INTERVAL } from '../componets/constants';
import { createDot, removeDot } from '../componets/utils';
import Control from '../componets/control';
import Dot from '../componets/dot';
import Score from '../componets/score';

import Timer from '../componets/timer';

const Game = () => {
  const [dots, updateDots] = useRecoilState(dotsState);
  const [controlState, setControlState] = useRecoilState(controlOptions);
  const [score, setScore] = useRecoilState(scoreState);
  const requestRef = useRef();
  const intervalRef = useRef();
  const fieldRef = useRef();

  const advanceStep = useCallback(() => {
    updateDots((oldDots) => {
      const newDots = [];
      for (let dot of oldDots) {
        const newY = dot.y + SPEED_STEP * controlState.speed / 60;
        if (newY <= fieldRef.current.offsetHeight - dot.size / 2) {
          newDots.push(
            {
              ...dot,
              y: newY,
            }
          );
        }
      }
      return newDots;
    });
    requestRef.current = requestAnimationFrame(advanceStep);
  }, [controlState.speed, updateDots]);

  const spawnDot = useCallback(() => {
    updateDots((oldDots) => [...oldDots, createDot()]);
  }, [updateDots]);


  useEffect(() => {
    const stop = () => {
      intervalRef.current && clearInterval(intervalRef.current);
      requestRef.current && cancelAnimationFrame(requestRef.current);
    }

    if (controlState.isRunning) {
      intervalRef.current = setInterval(spawnDot, SPAWN_INTERVAL);
      requestRef.current = requestAnimationFrame(advanceStep);
    } else {
      stop();
    }
    return () => stop();
  }, [controlState.isRunning, advanceStep, spawnDot])

  const clear = useCallback(() => {
    setControlState({ ...controlState, isRunning: false, speed: 5 });
    updateDots([]);
    setScore(0);
  }, [setControlState, setScore, updateDots, controlState]);

  const onDotClick = (index) => {

    updateDots(removeDot(dots, index));
  };

  return (
    <div className="text-center p-5">
      <div className="panel">
        
        <Control onClear={clear} />
        <Score />
        <Timer />
      </div>
      <div className="screen relative bg-slate-200 " ref={fieldRef}>
        {dots.map((dot, index) => {
          const x = (
            fieldRef.current.offsetWidth - dot.size
          ) * dot.x / 100
          return <Dot
            key={`dot-${index}`}
            {...dot}
            x={x}
            index={index}
            onClick={onDotClick}

          />;
        })}
        <div className=' bg-slate-600 w-1/5 h-1/6 absolute bottom-0 left-1/3 '
          onDragOver={(e) => {
            e.preventDefault();
          }}

          onDrop={

            (e) => {
              setScore(score + 1);
            }
          }
        >
          <div className='flex justify-center items-center h-full w-full'>
            <div className='text-white text-3xl'>
             BUCKET
              </div>
              </div>
           
         
        </div>

      </div>
    </div>
  );
}

export default Game;
