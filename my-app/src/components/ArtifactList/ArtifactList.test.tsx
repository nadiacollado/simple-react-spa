import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ArtifactList from "./ArtifactList";
import { BrowserRouter } from "react-router-dom";
import { vi, describe, it, expect } from "vitest";

vi.mock("../../services/metMuseumService", () => ({
  fetchArtifacts: async () => [
    {
      objectID: 1,
      title: "Mock Artifact",
      primaryImageSmall: "mock-image.jpg",
      artistDisplayName: "Mock Artist",
      objectURL: "http://mock.com",
      objectDate: "2000",
      medium: "Mock medium",
      department: "Mock department",
      culture: "Mock culture",
    },
  ],
}));

describe("ArtifactList", () => {
  it("renders artifacts from the API", async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ArtifactList />
        </BrowserRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Mock Artifact")).toBeInTheDocument();
    });
  });

  it("renders images with descriptive alt text", async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ArtifactList />
        </BrowserRouter>
      </QueryClientProvider>
    );

    const image = await screen.findByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("alt");
    expect(image.getAttribute("alt")).toMatch(/^Image of /);
  });
});
