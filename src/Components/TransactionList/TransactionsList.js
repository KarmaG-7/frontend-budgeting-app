import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TransactionsList() {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData() {
    try {
      let result = await axios.get("http://localhost:3001/transactions");
      setTransactions(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleTransactionDetail(id) {
    navigate(`/transactions/${id}`);
  }

  function formatDate(numericDate) {
    const date = new Date(numericDate);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);

    return formattedDate;
  }

  function balance(transactionsArray) {
    let sum = 0;
    for (const item of transactionsArray) {
      item.type.toUpperCase() === "INCOME"
        ? (sum += Number(item.amount))
        : (sum -= Number(item.amount));
    }
    return sum.toFixed(2);
  }

  return (
    <div className="table-container">
      <div className="balance">
        <strong>
          Balance: ${" "}
          <span style={{ color: balance(transactions) >= 0 ? "green" : "red" }}>
            {" "}
            {balance(transactions)}
          </span>{" "}
        </strong>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Item</th>
            <th>Amount in $</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item) => (
            <tr key={item.id} onClick={() => handleTransactionDetail(item.id)}>
              <td>{formatDate(item.date)}</td>
              <td>{item.item_name}</td>
              {item.type.toUpperCase() === "INCOME" ? (
                <td>+ {item.amount}</td>
              ) : (
                <td>- {item.amount}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsList;
