import { Link } from "react-router-dom";

function Details() {
  return (
    <>
      <div>
        <p>I am the details page</p>
        <nav>
          <Link to="/">Go to homepage</Link>
        </nav>
      </div>
    </>
  );
}

export default Details;
