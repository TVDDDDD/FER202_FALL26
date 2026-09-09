import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the person introduction", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { name: /person information/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByText(/hello, my name is john doe and i am 20 years old/i),
  ).toBeInTheDocument();
});
