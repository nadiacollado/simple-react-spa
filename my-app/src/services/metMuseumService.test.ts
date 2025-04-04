import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { fetchArtifacts } from "./metMuseumService";

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
});
