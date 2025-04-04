import { useLocation, useNavigate } from "react-router-dom";

const ArtifactDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const artifact = state?.artifact;

  if (!artifact) return <p>Failed to load artifact details.</p>;

  return (
    <>
      <div>
        <button
          onClick={() => navigate(-1)}
          className="font-secondary text-sm mb-4 text-black cursor-pointer underline hover:underline hover:decoration-gray-300"
        >
          Back to Artifacts
        </button>
      </div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-sm flex flex-col justify-center">
              <h1 className="font-primary text-3xl font-bold mb-4">
                {artifact.title}
              </h1>
              <p className="mb-2">
                <span className="font-semibold">Artist:</span>{" "}
                {artifact.artistDisplayName || "Unknown"}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Date:</span>{" "}
                {artifact.objectDate}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Medium:</span> {artifact.medium}
              </p>
              {artifact.culture && artifact.culture.trim() !== "" && (
                <p className="mb-2">
                  <span className="font-semibold">Culture:</span>{" "}
                  {artifact.culture}
                </p>
              )}
              {artifact.department && artifact.department.trim() !== "" && (
                <p className="mb-4">
                  <span className="font-semibold">Department:</span>{" "}
                  {artifact.department}
                </p>
              )}
              <a
                className="underline hover:underline hover:decoration-gray-300"
                href={artifact.objectURL}
                target="_blank"
                rel="noreferrer"
              >
                Visit Artifact on the Met Museum Archive
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
