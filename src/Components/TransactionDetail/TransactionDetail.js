import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function TransactionDetail() {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchDetail() {
    try {
      let url =
        process.env.NODE_ENV === "production"
          ? `https://backend-budgeting-app-ekrg.onrender.com/transactions/${id}`
          : `http://localhost:3001/transactions/${id}`;

      let result = await axios.get(url);
      setShowDetails(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleBack(e) {
    e.preventDefault();
    navigate("/transactions");
  }

  async function handleDelete() {
    try {
      let result = await axios.delete(
        `http://localhost:3001/transactions/${id}`
      );
      navigate("/transactions");
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleEdit(id) {
    navigate(`/transactions/${id}/edit`);
  }

  return (
    <div className="details">
      <h2>Transaction Details</h2>
      {showDetails && (
        <div className="table-container">
          <table className="table">
            <tbody>
              <tr>
                <td>Name: {showDetails.item_name}</td>
              </tr>
              <tr>
                <td>Amount: ${showDetails.amount}</td>
              </tr>
              <tr>
                <td>From: {showDetails.from}</td>
              </tr>
              <tr>
                <td>Date: {showDetails.date}</td>
              </tr>
              <tr>
                <td>Category: {showDetails.category}</td>
              </tr>
              <tr>
                <td>Type: {showDetails.type}</td>
              </tr>
            </tbody>
          </table>
          <div className="buttons">
            <button onClick={handleBack}>Back</button>
            <button onClick={() => handleEdit(id)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionDetail;
