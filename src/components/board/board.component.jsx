import React, { useState, useEffect } from 'react';
import useKeyPress from '../../utilities/hooks/useKeyPress';
import useInterval from '../../utilities/hooks/useInterval';
import Cell from '../cell/cell.component';
import './board.style.scss';

const Board = () => {
  const [cellCount] = useState(20);
  const [head, setHead] = useState({ x: 1, y: 10 });
  const [body, setBody] = useState([
    { x: 1, y: 11 },
    { x: 1, y: 12 },
    { x: 1, y: 13 },
    { x: 1, y: 14 },
    { x: 1, y: 15 },
  ]);
  const [tail, setTail] = useState({ x: 1, y: 16 });
  const [direction, setDirection] = useState('up');
  const [gameState, setGameState] = useState('paused'); // paused, started, finished

  const keyPressed = useKeyPress([
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
  ]);

  const moveBodyAndTail = () => {
    setTail(body[body.length - 1]);
    const nBody = body.filter((x, y) => y !== body.length - 1);
    setBody([head, ...nBody]);
  };

  const moveSnake = () => {
    switch (direction) {
      case 'up':
        if (head.y === 0) {
          setHead({ ...head, y: cellCount - 1 });
        } else {
          setHead({ ...head, y: head.y - 1 });
        }
        moveBodyAndTail();
        break;
      case 'down':
        if (head.y === cellCount - 1) {
          setHead({ ...head, y: 0 });
        } else {
          setHead({ ...head, y: head.y + 1 });
        }
        moveBodyAndTail();
        break;
      case 'right':
        if (head.x === cellCount - 1) {
          setHead({ ...head, x: 0 });
        } else {
          setHead({ ...head, x: head.x + 1 });
        }
        moveBodyAndTail();
        break;
      case 'left':
        if (head.x === 0) {
          setHead({ ...head, x: cellCount - 1 });
        } else {
          setHead({ ...head, x: head.x - 1 });
        }
        moveBodyAndTail();
        break;
      default:
        break;
    }
  };

  const handleKeyDown = (key) => {
    switch (key) {
      case 'ArrowUp':
        if (direction !== 'down') {
          setDirection('up');
        }
        break;
      case 'ArrowDown':
        if (direction !== 'up') {
          setDirection('down');
        }
        break;
      case 'ArrowRight':
        if (direction !== 'left') {
          setDirection('right');
        }
        break;
      case 'ArrowLeft':
        if (direction !== 'right') {
          setDirection('left');
        }
        break;
      default:
        break;
    }
  };

  const handleGameStateSwitch = () => {
    if (gameState === 'started') {
      setGameState('paused');
    } else {
      setGameState('started');
    }
  };

  useEffect(() => {
    if (keyPressed) {
      handleKeyDown(keyPressed);
    }
  }, [keyPressed]);

  useInterval(
    () => {
      moveSnake();
    },
    gameState === 'started' ? 100 : null
  );

  return (
    <div>
      <div className="board">
        {[...Array(cellCount).keys()].map((y) => (
          <div className="row" id={y} key={y}>
            {[...Array(cellCount).keys()].map((x) => (
              <Cell
                head={head}
                body={body}
                tail={tail}
                x={x}
                y={y}
                key={`${x}-${y}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div>
        <button
          type="button"
          className="start-button"
          onClick={() => handleGameStateSwitch()}
        >
          {gameState === 'started' ? 'pause' : 'start'}
        </button>
      </div>
    </div>
  );
};

export default Board;
