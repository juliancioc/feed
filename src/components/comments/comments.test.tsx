import { render, screen } from "@testing-library/react";

import { Comments } from ".";
import { Provider } from "src/components/ui/provider";
import { MemoryRouter } from "react-router-dom";

const mockComments = [
  {
    postId: 1,
    id: 1,
    body: "Mock to test",
  },
];

describe("Comments Component", () => {
  it("should render", () => {
    const mockRemoveComment = jest.fn();

    render(
      <MemoryRouter>
        <Provider>
          <Comments
            comments={mockComments}
            handleRemoveComment={mockRemoveComment}
          />
        </Provider>
      </MemoryRouter>
    );

    const comment = screen.getByTestId("comment-1");
    expect(comment).toBeInTheDocument();
  });
});
