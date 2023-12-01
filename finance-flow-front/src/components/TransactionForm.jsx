import React, { useState, useEffect } from "react";
import "../assets/css/TransactionForm.css";
import "../assets/css/BurgerMenu.css"; // Assurez-vous d'inclure le CSS pour le burger menu

function TransactionForm({ setAddTransaction }) {
  // States for form fields
  const [subcategories, setSubcategories] = useState([]);
  const [subcategory, setSubcategory] = useState(1);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");

  // State to control the form display
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch subcategories
    const fetchSubcategories = async () => {
      const response = await fetch(
        "http://localhost/finance-flow-back/index.php?getSubcategories"
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

  const handleTransaction = async (event) => {
    event.preventDefault();
    let data = new FormData();
    var userId = localStorage.getItem("userId");
    data.append("user_id", userId);
    data.append("subcategory_id", subcategory);
    data.append("date", date);
    data.append("title", title);
    data.append("amount", amount);
    data.append("submitAddTransactionForm", "");

    const fetchParams = {
      method: "POST",
      body: data,
      mode: "cors",
    };

    let result = await fetch(
      "http://localhost/finance-flow-back/index.php",
      fetchParams
    );

    let jsonResponse = await result.json();
    setMessage(jsonResponse.message);
    setAddTransaction(true);
  };

  // Toggle the form display
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
            required="required"
            autoComplete="off"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            required
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
