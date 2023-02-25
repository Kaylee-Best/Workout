import React, {useState} from 'react';
import Timer from './components/DurationExercise';
import Duration from './components/RepetitionExercise';
import Stopwatch from './components/RunningExercise';

function App() {
  let [counter, changeCounter] = useState(0)
  return (
    <div className="App">
      <header className="App-header">
        <h1>Time to Exercise!</h1>
        <p>
          Select an Exercise:
        </p>
        <button>
          Pushups
          </button>
          <button>
          Running
          </button>
          <button>
          Planks
          </button>
    <Timer />
    <Duration />
    <Stopwatch />
      </header>
    </div>
  );
}

export default App;
