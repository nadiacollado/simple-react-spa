import axios from "axios";

export interface Artifact {
  objectID: number;
  title: string;
  primaryImageSmall: string;
  artistDisplayName: string;
  objectURL: string;
}

const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

export const fetchArtifacts = async (): Promise<Artifact[]> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/objects`);
    const objectIDs = data.objectIDs.slice(3150, 3200);

    const artifactRequests = objectIDs.map((id: number) =>
      axios.get(`${BASE_URL}/objects/${id}`).catch(() => null)
    );

    const artifactsData = await Promise.all(artifactRequests);

    return artifactsData
      .map((res) => res?.data)
      .filter(
        (artifact) =>
          artifact &&
          typeof artifact.primaryImageSmall === "string" &&
          artifact.primaryImageSmall.trim() !== ""
      );
  } catch (error) {
    console.error("Error fetching artifacts:", error);
    return [];
  }
};
