import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import api from "src/services/api";
import { Provider } from "../ui/provider";
import { User } from ".";

jest.mock("src/services/api");

describe("User Component", () => {
  const mockUser = {
    id: 1,
    name: "Nate Foss",
    username: "natefoss",
  };

  beforeEach(() => {
    (api.get as jest.Mock).mockResolvedValue({ data: mockUser });
  });

  it("should render", async () => {
    render(
      <MemoryRouter>
        <Provider>
          <User userId={1} />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => expect(api.get).toHaveBeenCalledWith("/users/1"));

    expect(screen.getByText("Nate Foss")).toBeInTheDocument();
    expect(screen.getByText("@natefoss")).toBeInTheDocument();
  });
});
