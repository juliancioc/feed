import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { Provider } from "src/components/ui/provider";
import Profile from ".";

jest.mock("../../assets/logo.png", () => "/mocked-image.png");

describe("Profile Component", () => {
  it("should render", () => {
    render(
      <MemoryRouter>
        <Provider>
          <Profile />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Meu perfil")).toBeInTheDocument();
  });
});
