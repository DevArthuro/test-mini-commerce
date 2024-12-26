import React from "react";
import App from "../App";
import { render } from "@testing-library/react";

describe("App test", () => {
  it("should render App component", () => {
    render(<App />);
  });
});
