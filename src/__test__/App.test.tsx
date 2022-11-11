import * as React from "react";

import App from "../App";
import { cleanup, customRender, screen } from "./test-utils";

afterEach(cleanup);

describe("App tests", () => {
  it("should contains the heading 1", async () => {
    customRender(<App />);
    const heading = screen.getByText(/List App/i);
    expect(heading).toBeInTheDocument();
  });
});
