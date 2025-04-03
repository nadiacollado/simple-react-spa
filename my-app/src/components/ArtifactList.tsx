import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchArtifacts } from "../services/metMuseumService";
import { Artifact } from "../types/artifact";

const ArtifactList = () => {
  const {
    data: artifacts,
    isLoading,
    error,
  } = useQuery<Artifact[]>({
    queryKey: ["artifacts"],
    queryFn: fetchArtifacts,
    staleTime: Infinity,
  });

  if (isLoading) return <p>Loading Met Museum artifacts...</p>;
  if (error || !artifacts)
    return (
      <p>There’s been an issue loading artifacts. Please contact Nadia.</p>
    );

  return (
    <div>
      <h1>Met Museum Artifacts</h1>
      <div>
        {artifacts.map((artifact) => (
          <Link to={`/artifact/${artifact.objectID}`} key={artifact.objectID}>
            <img src={artifact.primaryImageSmall} alt={artifact.title} />
            <h2>{artifact.title || "Unknown Title"}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArtifactList;
