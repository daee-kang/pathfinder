import React from 'react';
import './App.css';
import Board from './Components/Board';

import { Provider } from './Provider'

function App() {
  return (
    <Provider>
      <Board />
    </Provider>

  );
}

export default App;
