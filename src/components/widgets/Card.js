import React, { useState } from "react";
import "./Card.css";
import getRandomInt from "../../utils/Random";
// import images from "../../assets/icons/food.png";

const Card = ({ title, price, tags, icon, date, type }) => {
  const [tagState, setTagState] = useState(tags);

  // TODO import colorlabels from external resource?
  //* MOCK
  const colorLabels = ["#EAC435", "#345995", "#07A0C3", "#FB4D3D", "#CA1551"];
  const randomColor = colorLabels[getRandomInt(0, colorLabels.length - 1)];
  const iconStyle = (() => {
    if (type === "category")
      return {
        backgroundImage: `url(${require(`../../assets/icons/icons_raw/${icon}.png`)})`,
      };
    else if (type === "goals") return { background: randomColor };
  })();

  // console.log(iconStyle);
  return (
    <div className="card">
      <div className="icon-container" style={iconStyle}>
        {/* <img src={image} alt="icon" /> */}
      </div>
      <div className="text-container">
        <h2 className="title">{title}</h2>
        <p className="date">{date}</p>
        {tags !== undefined && (
          <div className="tags">
            {tagState.map((tag) => (
              <div className="tag" key={`${title}-${tag}`}>
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="price-container">
        <p className={`price ${price > 0 ? "green" : "red"}`}>
          {price < 0 && "-"} € {price < 0 ? price.toString().slice(1,) : price}
        </p>
      </div>
    </div>
  );
};

export default Card;
