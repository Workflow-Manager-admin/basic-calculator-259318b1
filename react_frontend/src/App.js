import React, { useState } from "react";
import "./App.css";

const BUTTONS = [
  ["7", "8", "9", "÷"],
  ["4", "5", "6", "×"],
  ["1", "2", "3", "−"],
  ["0", "C", "=", "+"]
];

// Helper for operations
function operate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (op) {
    case "+": return (a + b).toString();
    case "−": return (a - b).toString();
    case "×": return (a * b).toString();
    case "÷": if (b === 0) return "Error"; return (a / b).toString();
    default: return b;
  }
}

// PUBLIC_INTERFACE
function Calculator() {
  /**
   * This is a public component for the minimal calculator user interface.
   * Allows basic operations: +, −, ×, ÷, and reset.
   * Minimalistic, light-themed, grid arrangement.
   */
  const [display, setDisplay] = useState("0");
  const [operator, setOperator] = useState(null);
  const [firstOperand, setFirstOperand] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  // Handle button clicks
  // PUBLIC_INTERFACE
  function handleButtonClick(val) {
    if ("0123456789".includes(val)) {
      // Number input
      if (display.length > 15 && !waitingForOperand) return;
      if (display === "0" || waitingForOperand) {
        setDisplay(val);
        setWaitingForOperand(false);
      } else {
        setDisplay(display + val);
      }
    } else if ("+−×÷".includes(val)) {
      if (operator && !waitingForOperand) {
        // Compute previous pending operator before chaining
        const result = operate(firstOperand ?? display, display, operator);
        setFirstOperand(result === "Error" ? null : result);
        setDisplay(result);
      } else {
        setFirstOperand(display);
      }
      setOperator(val);
      setWaitingForOperand(true);
    } else if (val === "=") {
      if (operator && firstOperand !== null) {
        const result = operate(firstOperand, display, operator);
        setDisplay(result);
        setOperator(null);
        setFirstOperand(null);
        setWaitingForOperand(true);
      }
    } else if (val === "C") {
      setDisplay("0");
      setOperator(null);
      setFirstOperand(null);
      setWaitingForOperand(false);
    }
  }

  return (
    <div className="calc-outer">
      <div className="calc-card" tabIndex="0" aria-label="Calculator">
        <div className="calc-display" data-testid="display" title={display}>{display}</div>
        <div className="calc-grid">
          {BUTTONS.flat().map((btn, i) => (
            <button
              key={i}
              className={[
                "calc-btn",
                btn === "=" ? "accent" : "",
                ["+", "−", "×", "÷"].includes(btn) ? "operator" : "",
                btn === "C" ? "secondary" : ""
              ].join(" ")}
              tabIndex="0"
              onClick={() => handleButtonClick(btn)}
              aria-label={
                btn === "C" ? "Clear" :
                btn === "÷" ? "Divide" :
                btn === "×" ? "Multiply" :
                btn === "−" ? "Subtract" :
                btn === "+" ? "Add" :
                btn === "=" ? "Equals" :
                btn
              }
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
      <footer className="calc-footer">
        <span>Minimal Calculator</span>
      </footer>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  /**
   * App component entrypoint for calculator application.
   * Renders Calculator centered on screen.
   */
  return (
    <div className="App calculator-app">
      <Calculator />
    </div>
  );
}

export default App;
