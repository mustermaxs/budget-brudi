import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContentWrapper from "../components/widgets/ContentWrapper";
import InputCollection from "../components/widgets/InputCollection";
import BBInput from "../components/widgets/BBInput";
import BbBtn from "../components/widgets/BbBtn";
import { jwtToken } from "../contexts/UserContext";
import "../components/widgets/colorlabelpicker.css";

function AddTransaction() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([])
    const [type, setType] = useState("income");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState([]);
    const [categoryID, setCategoryID] = useState(null);
    const [date, setDate] = useState(new Date());
    const [amount, setAmount] = useState(0);
    const loaded = useRef(false);


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
            setCategories([...categories.data])
            setCategoryID(categories.data[0].id) // set default value
            loaded.current = true;
        });
    }, [])

    const handleSubmit = async () => {
        fetch("http://localhost/budget-brudi/api/transactions", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({
                type, amount: amount, date: date, title: title, categoryID: categoryID
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken.get()}`
            }
        }).then(res => res.json()).then(response => {
            navigate("/transactions")
        });
    }

    return (
        <ContentWrapper>
            <InputCollection>
                <form onSubmit={handleSubmit} style={formStyles}>

                    <BBInput
                        type="text"
                        label="Title"
                        value={title}
                        name="goaltitle"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label htmlFor="category">Category</label>
                    <select
                        name="Category"
                        onChange={(e) => {
                            const selectedCategoryId = categories.find(cat => cat.title === e.target.value).id;
                            setCategoryID(selectedCategoryId);
                        }}
                        style={inputStyles}
                    >
                        {loaded.current && categories.map((cat) => (
                            <option key={cat.id} value={`${cat.title}`} id={`${cat.id}`}>
                                {cat.title}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="type">Type</label>
                    <select
                        name="type"
                        onChange={(e) => setType(e.target.value)}
                        style={inputStyles}
                    >
                        <option key="0" value="income">
                            Income
                        </option>
                        <option key="1" value="expense">
                            Expense
                        </option>
                    </select>


                    <BBInput
                        label="Amount"
                        type="currency"
                        value={amount}
                        currency="€"
                        placeholder="3000.00"
                        size="small"
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <BBInput
                        size="small"
                        name="date"
                        type="date"
                        value={date}
                        label="Date"
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <BbBtn content="save" onClick={handleSubmit} type="submit" style={buttonStyles} />
                </form>
            </InputCollection>
        </ContentWrapper >
    );
}

export default AddTransaction;
