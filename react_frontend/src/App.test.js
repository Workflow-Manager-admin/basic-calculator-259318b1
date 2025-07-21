import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test("Calculator app renders calculator display", () => {
  render(<App />);
  const display = screen.getByTestId("display");
  expect(display).toBeInTheDocument();
});

test("Calculator addition: 8 + 2 = 10", () => {
  render(<App />);
  ["8", "+", "2", "="].forEach((b) =>
    fireEvent.click(screen.getByText(b))
  );
  expect(screen.getByTestId("display")).toHaveTextContent("10");
});

test("Calculator division by zero shows Error", () => {
  render(<App />);
  ["8", "÷", "0", "="].forEach((b) =>
    fireEvent.click(screen.getByText(b))
  );
  expect(screen.getByTestId("display")).toHaveTextContent("Error");
});

test("Calculator 'C' resets state", () => {
  render(<App />);
  fireEvent.click(screen.getByText("7"));
  fireEvent.click(screen.getByText("C"));
  expect(screen.getByTestId("display")).toHaveTextContent("0");
});
