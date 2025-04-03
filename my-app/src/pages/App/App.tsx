import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <p>I am implementing routing</p>
        <nav>
          <Link to="/details">Details</Link>
        </nav>
      </div>
    </>
  );
}

export default App;
