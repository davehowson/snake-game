import React, { useState, useEffect } from 'react';
import useKeyPress from '../../utilities/hooks/useKeyPress';
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
  const [direction, setDirection] = useState('top');
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

  const handleKeyDown = (key) => {
    switch (key) {
      case 'ArrowUp':
        if (direction !== 'down') {
          if (head.y === 0) {
            setHead({ ...head, y: cellCount - 1 });
          } else {
            setHead({ ...head, y: head.y - 1 });
          }
          setDirection('up');
          moveBodyAndTail();
        }
        break;
      case 'ArrowDown':
        if (direction !== 'up') {
          if (head.y === cellCount - 1) {
            setHead({ ...head, y: 0 });
          } else {
            setHead({ ...head, y: head.y + 1 });
          }
          setDirection('down');
          moveBodyAndTail();
        }
        break;
      case 'ArrowRight':
        if (direction !== 'left') {
          if (head.x === cellCount - 1) {
            setHead({ ...head, x: 0 });
          } else {
            setHead({ ...head, x: head.x + 1 });
          }
          setDirection('right');
          moveBodyAndTail();
        }
        break;
      case 'ArrowLeft':
        if (direction !== 'right') {
          if (head.x === 0) {
            setHead({ ...head, x: cellCount - 1 });
          } else {
            setHead({ ...head, x: head.x - 1 });
          }
          setDirection('left');
          moveBodyAndTail();
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (keyPressed) {
      handleKeyDown(keyPressed);
    }
  }, [keyPressed]);

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
    </div>
  );
};

export default Board;
