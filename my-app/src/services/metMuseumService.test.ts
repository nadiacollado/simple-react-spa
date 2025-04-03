import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { fetchArtifacts, fetchArtifactById } from "./metMuseumService";
import { Artifact } from "../types/artifact";

vi.mock("axios");
const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
};

describe("metMuseumService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("fetchArtifacts", () => {
    it("returns an empty array if there is an error", async () => {
      mockedAxios.get.mockRejectedValue(new Error("Network error"));

      const result = await fetchArtifacts();
      expect(result).toEqual([]);
    });
  });

  describe("fetchArtifactById", () => {
    it("fetches and returns artifact by ID", async () => {
      const mockArtifact: Artifact = {
        objectID: 1,
        title: "Test Artifact",
        primaryImageSmall: "img.jpg",
        artistDisplayName: "Test Artist",
        artistDisplayBio: "Test Artist Bio",
        objectDate: 2000,
        objectURL: "http://example.com",
        medium: "Oil",
      };

      mockedAxios.get.mockResolvedValueOnce({ data: mockArtifact });

      const result = await fetchArtifactById("1");

      expect(result).toEqual(mockArtifact);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://collectionapi.metmuseum.org/public/collection/v1/objects/1"
      );
    });
  });
});
