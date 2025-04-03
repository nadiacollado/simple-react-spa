import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ArtifactDetail from "./ArtifactDetail";
import { BrowserRouter } from "react-router-dom";
import { vi, describe, it, expect } from "vitest";

vi.mock("../services/metMuseumService", () => ({
  fetchArtifactById: async () => ({
    objectID: 1,
    title: "Mock Artifact",
    artistDisplayName: "Mock Artist",
    primaryImageSmall: "mock-image.jpg",
    department: "Paintings",
    objectDate: "2000",
    objectURL: "http://mock.com",
    medium: "Oil on canvas",
    culture: "Mock Culture",
  }),
}));

describe("ArtifactDetail", () => {
  it("renders artifact from the API", async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ArtifactDetail />
        </BrowserRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Mock Artist")).toBeInTheDocument();
    });
  });

  it("links you to the artifact on the Met Museum site", async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ArtifactDetail />
        </BrowserRouter>
      </QueryClientProvider>
    );

    const link = await screen.findByRole("link", {
      name: /visit artifact on met museum/i,
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      "http://mock.com"
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });
});
