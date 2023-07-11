import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TransactionsList from "./Components/TransactionList/TransactionsList";
import NavBar from "./Components/NavBar/NavBar";
import NewTransaction from "./Components/NewTransaction/NewTransaction";
import TransactionDetail from "./Components/TransactionDetail/TransactionDetail";
import EditTransaction from "./Components/EditTransaction/EditTransaction";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />

        <Routes>
          <Route path="/transactions" element={<TransactionsList />}></Route>
          <Route path="/transactions/new" element={<NewTransaction />}></Route>
          <Route
            path="/transactions/:id"
            element={<TransactionDetail />}
          ></Route>
          <Route
            path="/transactions/:id/edit"
            element={<EditTransaction />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
