import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewTransaction() {
  const navigate = useNavigate();

  const [newTransaction, setNewTransaction] = useState({
    item_name: "",
    amount: 0,
    date: "",
    from: "",
    category: "",
    type: "",
  });

  function handleTextChange(e) {
    setNewTransaction({
      ...newTransaction,
      [e.target.id]: e.target.value,
    });
  }

  function handleSelectChange(event) {
    const selectedValue = event.target.value;

    setNewTransaction({
      ...newTransaction,
      type: selectedValue,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let result = await axios.post(
        "http://localhost:3001/transactions",
        newTransaction
      );
      setNewTransaction({});
      navigate("/transactions");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h3>Create New Transaction</h3>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            id="item_name"
            value={newTransaction.item_name}
            onChange={handleTextChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="text"
            id="date"
            placeholder="MM/DD/YYYY"
            value={newTransaction.date}
            onChange={handleTextChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            id="amount"
            value={newTransaction.amount}
            onChange={handleTextChange}
            required
          />
        </div>
        <div className="form-group">
          <label>From:</label>
          <input
            type="text"
            id="from"
            value={newTransaction.from}
            onChange={handleTextChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            id="category"
            value={newTransaction.category}
            onChange={handleTextChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Type:</label>
          <select
            id="type"
            value={newTransaction.type}
            onChange={handleSelectChange}
            required
          >
            <option value="">Select a type</option>
            <option value="income">Income</option>
            <option value="expenses">Expenses</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewTransaction;
