import React from 'react';
import { Counter } from './components/atoms/counter/Counter';
import './App.scss';
import { Week } from './components/organisms/week/Week';

function App() {
  return (
    <div className="App">
      <Counter />
      <Week />
    </div>
  );
}

export default App;
