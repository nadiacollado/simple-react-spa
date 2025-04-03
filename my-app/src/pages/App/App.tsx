import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { fetchArtifacts } from "../../services/metMuseumService";
import { Link } from "react-router-dom";
import { Artifact } from "../../types/artifact";

function App() {
  const {
    data: artifacts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["artifacts"],
    queryFn: fetchArtifacts,
    staleTime: Infinity,
  });

  if (isLoading) return <p>Loading Met Museum artifacts...</p>;
  if (error || !artifacts) {
    return (
      <p>
        There's been an issue loading the Met Museum artifact archive. Please
        contact Nadia.
      </p>
    );
  }

  return (
    <>
      <h1>Met Museum Artifacts</h1>
      <div>
        {artifacts?.map((artifact: Artifact) => (
          <Link
            to={`/artifact/${artifact.objectID}`}
            key={artifact.objectID}
            className="card"
          >
            <img src={artifact.primaryImageSmall} alt={artifact.title} />
            <h2>{artifact.title}</h2>
            <p>{artifact.artistDisplayName || "Unknown Artist"}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

export default App;
