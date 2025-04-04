import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchArtifacts } from "../../services/metMuseumService";
import { Artifact } from "../../types/artifact";

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
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Met Museum Artifacts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        {artifacts.map((artifact) => (
          <Link
            to={`/artifact/${artifact.objectID}`}
            state={{ artifact }}
            key={artifact.objectID}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-4"
          >
            <img
              className="w-full h-150 object-cover mb-9"
              src={artifact.primaryImageSmall}
              alt={`Image of ${artifact.title || "Unknown Artifact"}`}
            />
            <h2>{artifact.title || "Unknown Title"}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArtifactList;
