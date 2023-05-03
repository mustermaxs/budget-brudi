import React, { useEffect, useRef, useState } from "react";
import BbBtn from "./BbBtn";
import Modal from "./Modal";
import BBInput from "./BBInput";
import { jwtToken } from "../../contexts/UserContext";

const AddTransactionModal = ({ isOpen, onClose, onSubmit }) => {
    const [type, setType] = useState("income");
    const [title, setTitle] = useState("");
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);
    const [categoryID, setCategoryID] = useState(null);
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState(0);
    const loaded = useRef(false);

    const reset = () => {
        setTitle("income");
        setTitle("");
        setDate("");
        setAmount(0.00);
    };

    useEffect(() => {
        fetch('http://localhost/budget-brudi/api/categories', {
            method: 'GET',
            mode: "cors",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwtToken.get()}`
            }
          }).then((res) => {
            return res.json();
          }).then(categories => {
            console.log(categories.data);
            // TODO render transactions. vlt über state?
            setCategories(categories.data)
            loaded.current = true;
          });
        }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        var a = amount;

        if (type === "expense")
        {
            a = `-${amount}`;
        }
        let categoryName = category.split(":")[0];
        let categoryId = category.split(":")[1];
        onSubmit({ type: type, date: date, Title: title, Amount: a, Category: categoryName, categoryID: categoryId });
        onClose();
        reset();

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
                <label>Title</label>
                <BBInput onChange={(e) => {setTitle(e.target.value); console.log(e.target.value)}} type="text" name="Title" placeholder="Title" />
                <label>
                    Typ:
                    <select
                        onChange={(e) => {setType(e.target.value);}}
                        style={inputStyles}
                        name="type"
                    >
                        <option value="income">Einnahme</option>
                        <option value="expense">Ausgabe</option>
                    </select>
                </label>
                <label>
                    Kategorie:
                    <select
                        name="Category"
                        onChange={(e) => {setCategory(e.target.value); setCategoryID(e.target.value)}}
                        style={inputStyles}
                    >
                        {loaded && categories.map((cat) => (
                            <option key={cat.id} value={`${cat.title}:${cat.id}`}>
                                {cat.title}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Datum:
                    <input
                        type="date"
                        name="Date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={inputStyles}
                    />
                </label>
                <label>
                    Betrag:
                    <input
                        type="number"
                        name="Amount"
                        value={amount}
                        step="0.01"
                        onChange={(e) => setAmount(e.target.value)}
                        style={inputStyles}
                    />
                </label>
                <BbBtn content="save" onClick={handleSubmit} type="submit" style={buttonStyles} />
            </form>
        </Modal >
    );
};

export default AddTransactionModal;
