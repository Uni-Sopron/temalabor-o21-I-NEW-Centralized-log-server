import React from "react";
import { Link } from "react-router-dom";


function Nav() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav mx-auto">
            <li className="nav-item active font-weight-bold">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/mate">Máté</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/abel">Ábel</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/balint">Bálint</Link>
            </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;