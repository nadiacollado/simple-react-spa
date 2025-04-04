import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ArtifactDetail from "./ArtifactDetail";
import { BrowserRouter, useLocation } from "react-router-dom";
import { vi, describe, it, expect, Mock, beforeEach } from "vitest";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

describe("ArtifactDetail", () => {
  const artifact = {
    objectID: 1,
    title: "Mock Artifact",
    primaryImageSmall: "mock-image.jpg",
    artistDisplayName: "Mock Artist",
    objectURL: "http://mock.com",
    objectDate: "2000",
    medium: "Mock medium",
    department: "Mock department",
    culture: "Mock culture",
  };

  beforeEach(() => {
    (useLocation as Mock).mockReturnValue({
      state: { artifact },
    });
  });

  it("renders artifact passed via state", async () => {
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
      expect(screen.getByText("Mock Artifact")).toBeInTheDocument();
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
      name: /visit artifact on the met museum archive/i,
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "http://mock.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });

  it("renders image with descriptive alt text", async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ArtifactDetail />
        </BrowserRouter>
      </QueryClientProvider>
    );

    const image = await screen.findByRole("img");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("alt", "Image of Mock Artifact");
  });
});
