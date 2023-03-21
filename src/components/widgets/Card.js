import React, { useState } from 'react';
import "./Card.css"
// import images from "../../assets/icons/food.png";

const Card = ({ icon, title, date, tags, price }) => {
    const [tagState, setTagState] = useState(tags);

    const image = require(`../../assets/icons/${icon}.png`);

    return (
        <div className="card">
            <div className="icon-container">
                <img src={image} alt="icon" />
            </div>
            <div className="text-container">
                <h2 className="title">{title}</h2>
                <p className="date">{date}</p>
                <div className="tags">
                    {tagState.map(tag => (
                        <div className="tag" key={`${title}-${tag}`}>
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
            <div className="price-container">
                <p className={`price ${price > 0 ? "green" : "red"}`}>€ {price}</p>
            </div>
        </div>
    );
};

export default Card;
