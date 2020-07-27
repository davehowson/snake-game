import React from 'react';

import Board from './components/board/board.component';

import './app.scss';

const App = () => {
  return (
    <div>
      <h2 className="header">snake game</h2>
      <Board />
    </div>
  );
};

export default App;
