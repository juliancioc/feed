import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { Provider } from "src/components/ui/provider";
import UserPosts from ".";
import api from "src/services/api";

jest.mock("src/services/api");

jest.mock("../../assets/logo.png", () => "/mocked-image.png");

describe("UserPosts Component", () => {
  const mockPosts = [
    { id: 1, title: "Post 1", body: "Description post 1", userId: 1 },
    { id: 2, title: "Post 2", body: "Description post 2", userId: 1 },
  ];

  beforeEach(() => {
    (api.get as jest.Mock).mockResolvedValue({ data: mockPosts });
  });

  it("should render", async () => {
    render(
      <MemoryRouter initialEntries={["/user/1/posts"]}>
        <Provider>
          <Routes>
            <Route path="/user/:id/posts" element={<UserPosts />} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Posts")).toBeInTheDocument();

    await waitFor(() => {
      mockPosts.forEach((post) => {
        expect(screen.getByText(post.title)).toBeInTheDocument();
        expect(screen.getByText(post.body)).toBeInTheDocument();
      });
    });
  });
});
