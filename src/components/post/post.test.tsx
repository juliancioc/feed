import { render, screen } from "@testing-library/react";

import { Provider } from "src/components/ui/provider";
import { MemoryRouter } from "react-router-dom";
import { Post } from ".";

const mockPost = {
  title: "Test",
  body: "Post mock to test",
  userId: 1,
  id: 1,
};

describe("Post Component", () => {
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
});
