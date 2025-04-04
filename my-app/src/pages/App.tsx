import { Routes, Route } from "react-router-dom";
import ArtifactList from "../components/ArtifactList/ArtifactList";
import ArtifactDetail from "../components/ArtifactDetail/ArtifactDetail";

const App = () => {
  return (
    <div className="max-w-screen-xl mx-auto p-8 text-center">
      <Routes>
        <Route path="/" element={<ArtifactList />} />
        <Route path="/artifact/:id" element={<ArtifactDetail />} />
      </Routes>
    </div>
  );
};

export default App;
