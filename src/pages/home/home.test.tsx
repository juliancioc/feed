import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";

import { Provider } from "src/components/ui/provider";
import Home from ".";
import api from "src/services/api";

jest.mock("src/services/api");
jest.mock("../../assets/logo.png", () => "/mocked-image.png");

describe("Home Component", () => {
  const mockPosts = [
    {
      userId: 1,
      id: 1,
      title:
        "Post title",
      body:
        "Post description to test",
    },
  ];

  beforeEach(() => {
    (api.get as jest.Mock).mockResolvedValue({ data: mockPosts });
  });

  it("should render", async () => {
    render(
      <MemoryRouter>
        <Provider>
          <Home />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => expect(api.get).toHaveBeenCalledWith("/posts"));

    expect(screen.getByText("Post title")).toBeInTheDocument();
    expect(screen.getByText("Post description to test")).toBeInTheDocument();
  });
});
