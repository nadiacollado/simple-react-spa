import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import axios from "axios";
import { fetchArtifacts } from "./metMuseumService";

vi.mock("axios");

describe("metMuseumService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("fetchArtifacts", () => {
    it("returns an empty array if there is an error", async () => {
      (axios.get as Mock).mockRejectedValue(new Error("Network error"));

      const result = await fetchArtifacts();
      expect(result).toEqual([]);
    });

    it("should filter out artifacts without images", async () => {
      (axios.get as Mock).mockResolvedValueOnce({
        data: { objectIDs: [1500, 2000, 3155, 3190, 4500] },
      });

      (axios.get as Mock).mockResolvedValueOnce({
        data: {
          objectID: 3155,
          title: "Mock Artifact",
          primaryImageSmall: null,
          artistDisplayName: "Mock Artist",
          objectURL: "http://mock.com",
          objectDate: "2000",
          medium: "Mock medium",
          department: "Mock department",
          culture: "Mock culture",
        },
      });

      (axios.get as Mock).mockResolvedValueOnce({
        data: {
          objectID: 3190,
          title: "Mock Artifact",
          primaryImageSmall: "",
          artistDisplayName: "Mock Artist",
          objectURL: "http://mock.com",
          objectDate: "2000",
          medium: "Mock medium",
          department: "Mock department",
          culture: "Mock culture",
        },
      });

      const result = await fetchArtifacts();

      expect(result).toHaveLength(0);
    });
  });
});
