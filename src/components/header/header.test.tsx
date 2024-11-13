import { render, screen } from "@testing-library/react";

import { Provider } from "src/components/ui/provider";
import { MemoryRouter } from "react-router-dom";
import { Header } from ".";

jest.mock("../../assets/logo.png", () => "/mocked-image.png");

describe("Header Component", () => {
  it("should render", () => {
    render(
      <MemoryRouter>
        <Provider>
          <Header />
        </Provider>
      </MemoryRouter>
    );

    const logo = screen.getByAltText("Feed dev");
    expect(logo).toBeInTheDocument();
  });
});
