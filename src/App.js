import { useState } from "react";
import "./App.css";

function App() {
  const [result, setResult] = useState("0");
  const [prevNumber, setPrevNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNewNumber, setWaitingForNewNumber] = useState(false);

  // Append digit or "00"
  const appendDigit = (digit) => (e) => {
    e.preventDefault();
    setResult((prev) => {
      if (prev === "0" || waitingForNewNumber) {
        setWaitingForNewNumber(false);
        return digit;
      }
      return prev + digit;
    });
  };

  // Operator click
  const handleOperator = (op) => (e) => {
    e.preventDefault();
    if (operator && prevNumber !== null) {
      calculate();
    } else {
      setPrevNumber(Number(result));
    }
    setOperator(op);
    setWaitingForNewNumber(true);
  };

  // Equals / calculate
  const calculate = () => {
    if (operator && prevNumber !== null) {
      const current = Number(result);
      let computation = 0;

      switch (operator) {
        case "+":
          computation = prevNumber + current;
          break;
        case "-":
          computation = prevNumber - current;
          break;
        case "*":
          computation = prevNumber * current;
          break;
        case "/":
          if (current === 0) {
            alert("Cannot divide by zero!");
            return;
          }
          computation = prevNumber / current;
          break;
        case "%":
          computation = prevNumber % current;
          break;
        default:
          break;
      }

      setResult(String(computation));
      setPrevNumber(null);
      setOperator(null);
    }
  };

  // Square root
  const sqrt = (e) => {
    e.preventDefault();
    const num = Number(result);
    if (num < 0) {
      alert("Cannot take square root of negative number!");
      return;
    }
    setResult(String(Math.sqrt(num)));
  };

  // Reset calculator
  const resetResult = (e) => {
    e.preventDefault();
    setResult("0");
    setPrevNumber(null);
    setOperator(null);
    setWaitingForNewNumber(false);
  };

  return (
    <div className="App">
      <h3>3rd edition</h3>
      <h2>ORPAT</h2>
      <h2>OT-512GT</h2>
       <h3>CALCULATOR</h3>
      <p className="display">{result}</p>
         <h4>Indian Digit Separator</h4>
      <div className="calculator-buttons">
        {/* Number Buttons */}
        {["7","8","9","4","5","6","1","2","3","0","00","."].map((digit) => (
          <button key={digit} className="digit-btn" onClick={appendDigit(digit)}>
            {digit}
          </button>
        ))}

        {/* Operator Buttons */}
        {["+","-","*","/","%"].map((op) => (
          <button key={op} className="operator-btn" onClick={handleOperator(op)}>
            {op}
          </button>
        ))}

        {/* Special Buttons */}
        <button className="special-btn" onClick={sqrt}>√</button>
        <button className="operator-btn" onClick={calculate}>=</button>
        <button className="special-btn" onClick={resetResult}>C</button>
      </div>
    </div>
  );
}

export default App;