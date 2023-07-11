import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function NavBar() {
  const navigate = useNavigate();

  function handleNewTransaction() {
    navigate("/transactions/new");
  }

  return (
    <div className="navigation">
      <Link to="/transactions">
        <h1 className="logo">Budget App</h1>
      </Link>

      <button className="newbttn" onClick={handleNewTransaction}>
        New Transaction
      </button>
    </div>
  );
}

export default NavBar;
