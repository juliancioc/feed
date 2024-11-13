import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { Provider } from "src/components/ui/provider";
import MyPosts from ".";
import api from "src/services/api";
import generateId from "src/utils/generateId";

jest.mock("src/services/api");
jest.mock("../../assets/logo.png", () => "/mocked-image.png");
jest.mock("src/utils/generateId", () => jest.fn());

describe("MyPosts Component", () => {
  const mockPosts = [
    {
      userId: 1,
      id: 1,
      title: "Post title",
      body: "Post description to test",
    },
  ];

  beforeEach(() => {
    (api.get as jest.Mock).mockResolvedValue({ data: mockPosts });
  });

  it("should render", async () => {
    render(
      <MemoryRouter>
        <Provider>
          <MyPosts />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(api.get).toHaveBeenCalledWith("/posts?userId=1")
    );

    expect(screen.getAllByText("Post title")).toHaveLength(2);
    expect(screen.getAllByText("Post description to test")).toHaveLength(2);
  });

  it("should add a new post", async () => {
    render(
      <MemoryRouter>
        <Provider>
          <MyPosts />
        </Provider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByTestId("input-title-new-post"), {
      target: { value: "Title new post" },
    });
    fireEvent.change(screen.getByTestId("input-description-new-post"), {
      target: { value: "Description new post" },
    });

    fireEvent.click(screen.getByText("Adicionar"));

    expect(await screen.findAllByText("Title new post")).toHaveLength(2);
    expect(screen.getAllByText("Description new post")).toHaveLength(2);
  });
});
