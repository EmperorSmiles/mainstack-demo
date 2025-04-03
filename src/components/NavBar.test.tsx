/// <reference types="jest" />
import { render, screen } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import NavBar from "@/components/NavBar";
import { usePathname } from "next/navigation";
import fetchMock from "jest-fetch-mock";

// Correctly mock Next.js navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

// Enable fetch mocks
fetchMock.enableMocks();

describe("NavBar Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    fetchMock.resetMocks();
    (usePathname as jest.MockedFunction<typeof usePathname>).mockReturnValue(
      "/"
    );
  });

  it("renders without crashing", () => {
    render(<NavBar />);
    expect(screen.getByAltText(" Logo")).toBeInTheDocument();
  });

  it("renders menu items", () => {
    render(<NavBar />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
  });

  it("toggles the user menu on click", async () => {
    // Mock the response for this specific test
    fetchMock.mockResponseOnce(
      JSON.stringify({
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
      })
    );

    render(<NavBar />);

    const profileButton = screen.getByRole("button");
    await userEvent.click(profileButton);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  it("fetches and displays user info", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        first_name: "Jane",
        last_name: "Doe",
        email: "jane.doe@example.com",
      })
    );

    render(<NavBar />);
    await waitFor(() => {
      expect(screen.getByText("Jane Doe")).toBeInTheDocument();
      expect(screen.getByText("jane.doe@example.com")).toBeInTheDocument();
    });
  });

  it("opens and closes the apps dropdown", async () => {
    render(<NavBar />);

    // Get the apps menu item
    const appsMenuItem = screen.getByText("Apps");

    // Open dropdown
    await userEvent.hover(appsMenuItem);
    await waitFor(() => {
      expect(screen.getByText("LinkInBio")).toBeInTheDocument();
    });

    // Close dropdown - use the parent container, not the text element
    const appsContainer = appsMenuItem.closest("div") || appsMenuItem;
    await userEvent.unhover(appsContainer);

    await waitFor(() => {
      expect(screen.queryByText("LinkInBio")).not.toBeInTheDocument();
    });
  });
});
