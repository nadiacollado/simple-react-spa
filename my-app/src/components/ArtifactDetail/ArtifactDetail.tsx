import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchArtifactById } from "../../services/metMuseumService";
import { Artifact } from "../../types/artifact";

const ArtifactDetail = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: artifact,
    isLoading,
    error,
  } = useQuery<Artifact>({
    queryKey: ["artifact", id],
    queryFn: () => fetchArtifactById(id!),
  });

  if (isLoading) return <p>Loading artifact details...</p>;
  if (error || !artifact) return <p>Failed to load artifact details.</p>;

  return (
    <div>
      <h1>{artifact.title}</h1>
      <img
        src={artifact.primaryImageSmall}
        alt={`Image of ${artifact.title}`}
      />
      <p>
        <strong>Artist:</strong> {artifact.artistDisplayName || "Unknown"}
      </p>
      <p>
        <strong>Date:</strong> {artifact.objectDate}
      </p>
      <p>
        <strong>Medium:</strong> {artifact.medium}
      </p>
      <a href={artifact.objectURL} target="_blank" rel="noreferrer">
        Visit Artifact on Met Museum Archive
      </a>
    </div>
  );
};

export default ArtifactDetail;
