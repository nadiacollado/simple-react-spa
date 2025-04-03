import "./App.css";

import { Routes, Route } from "react-router-dom";
import ArtifactList from "../../components/ArtifactList";
import ArtifactDetail from "../../components/ArtifactDetail";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ArtifactList />} />
      <Route path="/artifact/:id" element={<ArtifactDetail />} />
    </Routes>
  );
};

export default App;
