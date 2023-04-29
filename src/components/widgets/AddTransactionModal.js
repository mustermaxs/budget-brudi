import React, { useState } from "react";
import BbBtn from "./BbBtn";
import Modal from "./Modal";

const AddTransactionModal = ({ isOpen, onClose, onSubmit }) => {
    const [type, setType] = useState("income");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState(0);

    const categories = ["work", "transportation", "health"];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ type, category, date, amount });
        onClose();
    };

    const formStyles = {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    };

    const inputStyles = {
        padding: "8px",
        borderRadius: "5px",
        border: "1px solid #ccc",
    };

    const buttonStyles = {
        padding: "10px",
        borderRadius: "5px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        cursor: "pointer",
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} style={formStyles}>
                <label>
                    Typ:
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        style={inputStyles}
                    >
                        <option value="income">Einnahme</option>
                        <option value="expense">Ausgabe</option>
                    </select>
                </label>
                <label>
                    Kategorie:
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={inputStyles}
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Datum:
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={inputStyles}
                    />
                </label>
                <label>
                    Betrag:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={inputStyles}
                    />
                </label>
                <BbBtn content="save" type="submit" style={buttonStyles} />
            </form>
        </Modal >
    );
};

export default AddTransactionModal;
