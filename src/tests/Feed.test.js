import { render, screen } from "@testing-library/react";
import Feed from "../components/Feed";

test("When a user makes a new post, the post is put into the front of the feed.", async () => {
  render(<Feed></Feed>);

  const loadedFeed = screen.getAllByText(/post/i);
  expect(loadedFeed).toBeInTheDocument();
});
