import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ContentWrapper from "../components/widgets/ContentWrapper";
import InputCollection from "../components/widgets/InputCollection";
import BBInput from "../components/widgets/BBInput";
import BbBtn from "../components/widgets/BbBtn";
import { jwtToken } from "../contexts/UserContext";
import "../components/widgets/colorlabelpicker.css";

function EditTransaction() {
    const [searchParams] = useSearchParams();
    const transactionType = searchParams.get("type");
    const navigate = useNavigate();
    const [categories, setCategories] = useState([])
    const [type, setType] = useState(transactionType);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [categoryID, setCategoryID] = useState(null);
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState(0);
    const loaded = useRef(false);
    const transactionId = searchParams.get("id");


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
        }).then(
            fetch(`http://localhost:80/budget-brudi/api/transactions/${transactionType}/${transactionId}`, {
                method: 'GET',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken.get()}`
                }
            }).then((res) => {
                return res.json();
            }).then(transaction => {
                console.log(transaction.data);
                setTitle(transaction.data.Title)
                setCategory(transaction.data.Category)
                setCategoryID(transaction.data.categoryID)
                setAmount(transaction.data.Amount)
                setDate(transaction.data.date)
                setType(transactionType)
                loaded.current = true;
            }))
    }, [transactionId, transactionType])

    const handleSubmit = async () => {
        fetch(`http://localhost:80/budget-brudi/api/transactions/${transactionType}/${transactionId}`, {
            method: "PUT",
            mode: "cors",
            body: JSON.stringify({
                amount, date, title, categoryID: categoryID
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
                            const selectedCategoryTitle = e.target.value;
                            const selectedCategoryId = categories.find(cat => cat.title === selectedCategoryTitle).id;
                            setCategoryID(selectedCategoryId);
                            setCategory(selectedCategoryTitle);
                        }}
                        style={inputStyles}
                        value={category}
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
                        value={type}
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

export default EditTransaction;
