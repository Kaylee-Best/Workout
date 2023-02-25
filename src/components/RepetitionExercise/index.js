import React, {useState} from 'react';

export const Duration = () => {
let [counter, changeCounter] = useState(0)
return (
  <div className="App">
    <header className="App-header">
      <h1>Pushups</h1>
      <p>
        Reps: {counter}
      </p>
      <button onClick={() => {changeCounter(counter + 1)}}>
        Complete Rep
        </button>
      <button onClick={() => {changeCounter(counter = 0)}}>
        Reset
      </button>
    </header>
  </div>
);
};

export default Duration;