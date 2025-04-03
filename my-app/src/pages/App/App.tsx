import "./App.css";

import { Routes, Route } from "react-router-dom";
import ArtifactList from "../../components/ArtifactList";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ArtifactList />} />
    </Routes>
  );
};

export default App;
