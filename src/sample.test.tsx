import { render } from "@testing-library/react";
import { buildMockGet, buildServer } from "./jestUtils";

function Component() {
  return <div>Test</div>;
}

buildServer(buildMockGet());

describe("Test", () => {
  it("should render", () => {
    render(<Component />);
  });
});
