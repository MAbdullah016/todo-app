import { Link } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  return (
    <nav>
      <div>
        <Link to="/">My Todo</Link>

        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>|</li>

            <li>
              <Link to="/edit">Edit</Link>
            </li>

            <li>|</li>

            <li>
              <Link to="/github">Github</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;