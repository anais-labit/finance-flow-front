import React, { useState, useEffect } from "react";
import "../assets/css/TransactionForm.css";

function TransactionForm() {
  // const userId = localStorage.getItem("userId");
  const [subcategories, setSubcategories] = useState([]);
  const [subcategory, setSubcategory] = useState(1);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSubcategories = async () => {
      const response = await fetch(
        "http://localhost/plateforme/finance-flow-back/index.php?getSubcategories"
      );
      const data = await response.json();

      if (response.ok && data.subcategories) {
        setSubcategories(data.subcategories);
      } else {
        console.error("Erreur lors de la récupération des sous-catégories");
      }
    };
    fetchSubcategories();
  }, []);

  const handleTransaction = async () => {
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
      "http://localhost/plateforme/finance-flow-back/index.php",
      fetchParams
    );

    let jsonResponse = await result.json();
    console.log(jsonResponse);
    setMessage(jsonResponse.message);
  };

  return (
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
      <button
        type="button"
        id="addTransactionBtn"
        name="addTransactionBtn"
        onClick={handleTransaction}
      >
        Add Transaction
      </button>
    </form>
  );
}

export default TransactionForm;
