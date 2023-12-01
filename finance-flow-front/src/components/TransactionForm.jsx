import React, { useState, useEffect } from "react";
import "../assets/css/TransactionForm.css";
import "../assets/css/BurgerMenu.css";

function TransactionForm({ setAddTransaction, setBalance }) {
  const [subcategories, setSubcategories] = useState([]);
  const [subcategory, setSubcategory] = useState(1);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [message, setMessage] = useState("");

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchSubcategories = async () => {
      const response = await fetch(
        "http://localhost/plateforme/finance-flow-back/index.php?getSubcategories"
      );
      const data = await response.json();

      if (response.ok && data.subcategories) {
        setSubcategories(data.subcategories);
      } else {
        console.error("Erreur lors de la récupération des catégories");
      }
    };
    fetchSubcategories();
  }, []);

  const fetchCurrentBalance = async () => {
    try {
      let userId = localStorage.getItem("userId");
      const response = await fetch(
        `http://localhost/plateforme/finance-flow-back/index.php?getUserBalance&userId=${userId}`
      );

      if (response.ok) {
        const data = await response.json();
          setBalance(data.balance);        
      } else {
        console.error(
          "Erreur lors de la récupération du budget. Réponse du serveur :",
          response
        );
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du budget :",
        error.message
      );
    }
  };

  const handleTransaction = async (event) => {
    event.preventDefault();
    let data = new FormData();
    var userId = localStorage.getItem("userId");
    data.append("user_id", userId);
    data.append("subcategory_id", subcategory);
    data.append("date", date);
    data.append("title", title);
    data.append("amount", transactionAmount);
    data.append("submitAddTransactionForm", "");

    const fetchParams = {
      method: "POST",
      body: data,
      mode: "cors",
    };

    let result = await fetch(
      "http://localhost/plateforme/finance-flow-back/index.php",
      fetchParams
    );

    let jsonResponse = await result.json();
    if (jsonResponse) {
      fetchCurrentBalance();
    }
    setMessage(jsonResponse.message);
    setAddTransaction(true);
  };

  const toggleFormDisplay = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      {" "}
      <h2 className="transaction-list-title">Transactions</h2>
      <button className="burger-menu" onClick={toggleFormDisplay}>
        +
      </button>
      {showForm && (
        <form
          id="addTransactionForm"
          method="post"
          onSubmit={handleTransaction}
          className="transaction-form"
        >
          <p id="message">{message}</p>
          <input
            type="date"
            autoComplete="off"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="text"
            id="newTransaction"
            name="newTransaction"
            placeholder="Title"
            autoComplete="off"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            value={transactionAmount}
            onChange={(e) => setTransactionAmount(e.target.value)}
            placeholder="Amount"
          />
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            required
          >
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
          <button type="submit" id="addTransactionBtn" name="addTransactionBtn">
            Add Transaction
          </button>
        </form>
      )}
    </>
  );
}

export default TransactionForm;
