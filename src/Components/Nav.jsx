import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <ul>
        <Link to="/Home">
          <li>Home</li>
        </Link>
        <Link to="/Login">
          <li>Login</li>
        </Link>
      </ul>
    </div>
  );
}

export default Nav;
