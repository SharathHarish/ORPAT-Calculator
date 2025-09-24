import { useState } from "react";
import { evaluate } from "mathjs";
import "./App.css";

function App() {
  const [expression, setExpression] = useState(""); // full expression
  const [result, setResult] = useState("0");

  // Append digit, dot, or parentheses
  const appendCharacter = (char) => () => {
    const parts = expression.split(/[\+\-\x\/\%\(\)]/);
    const lastPart = parts[parts.length - 1];

    if (char === "." && lastPart.includes(".")) return; // prevent multiple dots in a number
    if (expression.length >= 30) return; // max expression length

    setExpression((prev) => prev + char);
    setResult((prev) => (prev === "0" ? char : prev + char));
  };

  // Operator click
  const handleOperator = (op) => () => {
    if (expression === "") return; // cannot start with operator
    const lastChar = expression.slice(-1);

    if ("+-*/%".includes(lastChar)) {
      setExpression(expression.slice(0, -1) + op); // replace consecutive operators
    } else {
      setExpression(expression + op);
    }
    setResult(op);
  };

  // Calculate result
  const calculate = () => {
    if (expression === "") return;
    try {
      const computation = evaluate(expression);

      if (!isFinite(computation)) {
        setResult("Error: Division by zero");
        setExpression("");
        return;
      }

      let display = String(computation);
      if (display.length > 10) display = display.slice(0, 10); // limit to 10 digits

      setResult(display);
      setExpression(display); // allow chaining
    } catch (err) {
      setResult("Error: Invalid Expression");
      setExpression("");
      console.error(err);
    }
  };

  // Square root
  const sqrt = () => {
    try {
      const val = evaluate(expression || result);
      if (val < 0) {
        setResult("Error: Negative sqrt");
        setExpression("");
        return;
      }

      let sqrtVal = Math.sqrt(val);
      let display = String(sqrtVal);
      if (display.length > 10) display = display.slice(0, 10); // limit to 10 digits

      setResult(display);
      setExpression(display);
    } catch {
      setResult("Error: Invalid Expression");
      setExpression("");
    }
  };

  // Reset calculator
  const reset = () => {
    setExpression("");
    setResult("0");
  };

  // Clear last character
  const clearLast = () => {
    if (expression.length <= 1) {
      setExpression("");
      setResult("0");
    } else {
      const newExpr = expression.slice(0, -1);
      setExpression(newExpr);
      setResult(newExpr.slice(-1));
    }
  };

  // Manual input
  const handleManualInput = (e) => {
    let val = e.target.value;
    if (/^[0-9+\-*/%().]*$/.test(val) && val.length <= 30) {
      setExpression(val);
      setResult(val.slice(-1) || "0");
    }
  };

  return (
    <div className="App">
      <div className="row">
        <h2 className="orpat">ORPAT</h2>
        <div className="right-side">
          <h2 className="model">OT-512GT</h2>
          <h4 className="calc">CALCULATOR</h4>
        </div>
      </div>

      {/* Display */}
      <input
        className="display"
        type="text"
        value={expression || result}
        onChange={handleManualInput}
      />

      <div className="calculator-buttons">
        {/* Number Buttons */}
        {["7","8","9","4","5","6","1","2","3","0","."].map((digit) => (
          <button key={digit} onClick={appendCharacter(digit)}>{digit}</button>
        ))}

        {/* Operator Buttons */}
        {["+","-","*","/","%"].map((op) => (
          <button key={op} onClick={handleOperator(op)}>{op}</button>
        ))}

        {/* Parentheses */}
        {["(",")"].map((p) => (
          <button key={p} onClick={appendCharacter(p)}>{p}</button>
        ))}

        {/* Special Buttons */}
        <button onClick={sqrt}>√</button>
        <button onClick={calculate}>=</button>
        <button onClick={reset}>AC</button>
        <button onClick={clearLast}>C</button>
      </div>
    </div>
  );
}

export default App;
