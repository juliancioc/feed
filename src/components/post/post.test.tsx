import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { Provider } from "src/components/ui/provider";
import { MemoryRouter } from "react-router-dom";
import { Post } from ".";
import generateId from "src/utils/generateId";
import api from "src/services/api";

jest.mock("src/services/api");
jest.mock("src/utils/generateId", () => jest.fn());

const mockPost = {
  title: "Test",
  body: "Post mock to test",
  userId: 1,
  id: 1,
};

const mockComments = [
  {
    postId: 1,
    id: 101,
    name: "John Doe",
    email: "john@example.com",
    body: "Test comment 1",
  },
  {
    postId: 1,
    id: 102,
    name: "Jane Doe",
    email: "jane@example.com",
    body: "Test comment 2",
  },
];

describe("Post Component", () => {
  beforeEach(() => {
    (api.get as jest.Mock).mockResolvedValue({ data: mockComments });
    (generateId as jest.Mock).mockReturnValue(103);
  });

  it("should render", () => {
    render(
      <MemoryRouter>
        <Provider>
          <Post post={mockPost} />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Post mock to test")).toBeInTheDocument();
  });

  it("should add a new comment", async () => {
    render(
      <MemoryRouter>
        <Provider>
          <Post post={mockPost} />
        </Provider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Novo comentário"), {
      target: { value: "New comment to test" },
    });
    fireEvent.click(screen.getByTestId("btn-add-new-comment"));

    await waitFor(() => {
      expect(screen.getAllByText("New comment to test")).toHaveLength(2);
    });
  });
});
