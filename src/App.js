import React from "react"
import './App.css';
import Main from './Components/Main';

import { Provider } from './Provider'

function App() {
  return (
    <Provider>
      <Main />
    </Provider>

  );
}

export default App;
