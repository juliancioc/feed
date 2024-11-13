import { render, screen } from "@testing-library/react";

import { Provider } from "src/components/ui/provider";
import { MemoryRouter } from "react-router-dom";
import Loading from ".";

describe("Loading Component", () => {
  it("should render", () => {
    render(
      <MemoryRouter>
        <Provider>
          <Loading />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });
});
