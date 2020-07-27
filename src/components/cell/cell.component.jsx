import React from 'react';
import PropTypes from 'prop-types';

import './cell.style.scss';

const Cell = ({ head, body, tail, x, y, pellet }) => {
  if (x === head.x && y === head.y) {
    return (
      <div className="cell">
        <span className="cell--inner cell--inner__head" />
      </div>
    );
  }
  if (body.some((b) => b.x === x && b.y === y)) {
    return (
      <div className="cell">
        <span className="cell--inner cell--inner__body" />
      </div>
    );
  }
  if (x === tail.x && y === tail.y) {
    return (
      <div className="cell">
        <span className="cell--inner cell--inner__tail" />
      </div>
    );
  }
  if (x === pellet.x && y === pellet.y) {
    return (
      <div className="cell">
        <span className="cell--inner cell--inner__pellet" />
      </div>
    );
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
  pellet: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};
