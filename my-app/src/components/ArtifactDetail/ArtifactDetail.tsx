import { useLocation, useNavigate } from "react-router-dom";

const ArtifactDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const artifact = state?.artifact;

  if (!artifact) return <p>Failed to load artifact details.</p>;

  return (
    <>
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-black cursor-pointer "
        >
          Back
        </button>
      </div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-bold mb-4">{artifact.title}</h1>
              <p className="text-m mb-2">
                <strong className="font-semibold">Artist:</strong>{" "}
                {artifact.artistDisplayName || "Unknown"}
              </p>
              <p className="text-m mb-2">
                <strong className="font-semibold">Date:</strong>{" "}
                {artifact.objectDate}
              </p>
              <p className="text-m mb-4">
                <strong className="font-semibold">Medium:</strong>{" "}
                {artifact.medium}
              </p>
              <a href={artifact.objectURL} target="_blank" rel="noreferrer">
                Visit Artifact on Met Museum Archive
              </a>
            </div>
            <div className="bg-black p-6 flex justify-center">
              <img
                src={artifact.primaryImageSmall}
                alt={`Image of ${artifact.title}`}
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtifactDetail;
