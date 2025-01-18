import { useState } from 'react';
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

const App = () => {
  const [input, setInput] = useState('');

  const handleButtonClick = (value: string) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleCalculate = async () => {
    try {
      const result: string = await invoke('evaluate_expression', { expression: input });
      setInput(result);
    } catch {
      setInput('Error');
    }
  };

  return (
    <div>
      <h1>calc-tauri</h1>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          handleCalculate();
        }}
      >
        <input
          id="greet-input"
          type="text"
          value={input}
          readOnly
        />
        <div className="calculator-buttons">
          {['1', '2', '3', '+'].map((value) => (
            <button type="button" onClick={() => handleButtonClick(value)} key={value}>
              {value}
            </button>
          ))}
          {['4', '5', '6', '-'].map((value) => (
            <button type="button" onClick={() => handleButtonClick(value)} key={value}>
              {value}
            </button>
          ))}
          {['7', '8', '9', '*'].map((value) => (
            <button type="button" onClick={() => handleButtonClick(value)} key={value}>
              {value}
            </button>
          ))}
          {['0', 'C', '=', '/'].map((value) => (
            <button
              type="button"
              onClick={() => {
                if (value === 'C') handleClear();
                else if (value === '=') handleCalculate();
                else handleButtonClick(value);
              }}
              key={value}
            >
              {value}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default App;
