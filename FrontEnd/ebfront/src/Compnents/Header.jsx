import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-light"
        data-bs-theme="light"
      >
        <div className="container-fluid">

          <Link to="/" className="navbar-brand">
            Electricity Board
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor03"
            aria-controls="navbarColor03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarColor03"
          >
            <ul className="navbar-nav me-auto">

              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link active"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="Statistics/"
                  className="nav-link"
                >
                  DashBoard Statistics
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="Login/"
                  className="nav-link"
                >
                Login
                </Link>
              </li>

            </ul>
          </div>

        </div>
      </nav>
    </>
  );
}

export default Header;