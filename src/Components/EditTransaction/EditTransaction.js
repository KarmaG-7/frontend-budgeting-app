import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function EditTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedTransaction, setSelectedTransaction] = useState({
    item_name: "",
    amount: 0,
    date: "",
    from: "",
    category: "",
  });

  useEffect(() => {
    fetchDetail();
  }, []);

  async function fetchDetail() {
    try {
      let result = await axios.get(`http://localhost:3001/transactions/${id}`);
      setSelectedTransaction(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleTextChange(e) {
    setSelectedTransaction({
      ...selectedTransaction,
      [e.target.id]: e.target.value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let result = await axios.put(
        `http://localhost:3001/transactions/${id}/edit`,
        selectedTransaction
      );
      alert("UPDATED");
      navigate("/transactions");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h3>Edit the Transaction</h3>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            id="item_name"
            value={selectedTransaction.item_name}
            onChange={handleTextChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date:</label>
          <input
            type="text"
            id="date"
            value={selectedTransaction.date}
            onChange={handleTextChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            id="amount"
            value={selectedTransaction.amount}
            onChange={handleTextChange}
            required
          />
        </div>
        <div className="form-group">
          {" "}
          <label>From:</label>
          <input
            type="text"
            id="from"
            value={selectedTransaction.from}
            onChange={handleTextChange}
            required
          />
        </div>
        <div className="form-group"></div>

        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            id="category"
            value={selectedTransaction.category}
            onChange={handleTextChange}
            required
          />
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
}

export default EditTransaction;
