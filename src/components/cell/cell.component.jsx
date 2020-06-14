import React from 'react';
import PropTypes from 'prop-types';

import './cell.style.scss';

const Cell = ({ head, body, tail, x, y }) => {
  if (x === head.x && y === head.y) {
    return <div className="cell">H</div>;
  }
  if (body.some((b) => b.x === x && b.y === y)) {
    return <div className="cell">B</div>;
  }
  if (x === tail.x && y === tail.y) {
    return <div className="cell">T</div>;
  }
  return <div className="cell" />;
};

export default Cell;

Cell.propTypes = {
  head: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  body: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    })
  ).isRequired,
  tail: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};
