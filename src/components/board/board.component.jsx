import React, { useState, useEffect } from 'react';
import useKeyPress from '../../utilities/hooks/useKeyPress';
import useInterval from '../../utilities/hooks/useInterval';
import Cell from '../cell/cell.component';
import './board.style.scss';

const Board = () => {
  const [cellCount] = useState(20);
  const [duration] = useState(100);
  const [head, setHead] = useState({ x: 1, y: 10 });
  const [body, setBody] = useState([
    { x: 1, y: 11 },
    { x: 1, y: 12 },
  ]);
  const [tail, setTail] = useState({ x: 1, y: 13 });
  const [pellet, setPellet] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('up');
  const [pelletEaten, setPelletEaten] = useState(false);
  const [gameState, setGameState] = useState('paused'); // paused, started, finished
  const [changeDirection, setChangeDirection] = useState(false);
  const [score, setScore] = useState(0);

  const keyPressed = useKeyPress([
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
  ]);

  const moveBodyAndTail = () => {
    if (!pelletEaten) {
      setTail(body[body.length - 1]);
    } else {
      setPelletEaten(false);
    }
    const nBody = pelletEaten
      ? body
      : body.filter((x, y) => y !== body.length - 1);
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
        break;
      case 'down':
        if (head.y === cellCount - 1) {
          setHead({ ...head, y: 0 });
        } else {
          setHead({ ...head, y: head.y + 1 });
        }
        break;
      case 'right':
        if (head.x === cellCount - 1) {
          setHead({ ...head, x: 0 });
        } else {
          setHead({ ...head, x: head.x + 1 });
        }
        break;
      case 'left':
        if (head.x === 0) {
          setHead({ ...head, x: cellCount - 1 });
        } else {
          setHead({ ...head, x: head.x - 1 });
        }
        break;
      default:
        break;
    }
    moveBodyAndTail();
  };

  const handleKeyDown = (key) => {
    if (!changeDirection) {
      switch (key) {
        case 'ArrowUp':
          if (direction !== 'down') {
            setDirection('up');
            setChangeDirection(true);
          }
          break;
        case 'ArrowDown':
          if (direction !== 'up') {
            setDirection('down');
            setChangeDirection(true);
          }
          break;
        case 'ArrowRight':
          if (direction !== 'left') {
            setDirection('right');
            setChangeDirection(true);
          }
          break;
        case 'ArrowLeft':
          if (direction !== 'right') {
            setDirection('left');
            setChangeDirection(true);
          }
          break;
        default:
          break;
      }
    }
  };

  const handleGameStateSwitch = () => {
    if (gameState === 'started') {
      setGameState('paused');
    } else {
      setGameState('started');
    }
  };

  const cellIsInSnake = ({ x, y }) => {
    if (
      body.some((c) => c.x === x && c.y === y) ||
      (head.x === x && head.y === y) ||
      (tail.x === x && tail.y === x)
    )
      return true;
    return false;
  };

  const getRandomCell = () => {
    let x;
    let y;
    do {
      x = Math.floor(Math.random() * (cellCount - 1 - 0 + 1) + 0);
      y = Math.floor(Math.random() * (cellCount - 1 - 0 + 1) + 0);
    } while (cellIsInSnake({ x, y }));
    return {
      x,
      y,
    };
  };

  useEffect(() => {
    if (keyPressed) {
      handleKeyDown(keyPressed);
    }
  }, [keyPressed]);

  useInterval(
    () => {
      moveSnake();
      setChangeDirection(false);

      if (body.some((p) => p.x === head.x && p.y === head.y)) {
        setGameState('finished');
      } else if (head.x === pellet.x && head.y === pellet.y) {
        setPelletEaten(true);
        setPellet(getRandomCell());
        setScore(score + 1);
      }
    },
    gameState === 'started' ? duration : null
  );

  useInterval(
    () => {
      setPellet(getRandomCell());
    },
    gameState === 'started' ? duration * cellCount * 2 : null,
    pelletEaten
  );

  return (
    <div className="container">
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
                  pellet={pellet}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="score">
        <p>score : {score}</p>
      </div>
      <div>
        <button
          type="button"
          className="start-button"
          onClick={() => handleGameStateSwitch()}
          disabled={gameState === 'finished'}
        >
          {gameState === 'started' ? 'pause' : 'start'}
        </button>
        {gameState === 'finished' && <p>Game Over</p>}
      </div>
    </div>
  );
};

export default Board;
