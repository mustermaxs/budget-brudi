import React, { useState } from "react";
import "./Card.css";
import getRandomInt from "../../utils/Random";
import getIconPath from "../../assets/Icons";
// import images from "../../assets/icons/food.png";

const Card = ({ title, price, tags, icon, date, type, onClick }) => {
  const [tagState, setTagState] = useState(tags);

  // TODO import colorlabels from external resource?
  //* MOCK
  const colorLabels = ["#EAC435", "#345995", "#07A0C3", "#FB4D3D", "#CA1551"];
  const randomColor = colorLabels[getRandomInt(0, colorLabels.length - 1)];
  
  //! ich habe versucht es in getIconPath() auszulagern,
  // aber das funktioniert iwie nicht mit den Pfaden, ka wieso
  const iconStyle = (() => {
    const categoryMapping = {
      "Media Electronics": "Entertainment",
      "Groceries": "Groceries",
      "Restaurant": "Restaurant",
      "Health": "Medicine",
      "Bills": "Bills",
      "Rent": "Rent",
      "Subscriptions": "Entertainment",
      "Transportation": "Transportation",
      "Work": "Work",
      "Salary": "Salary",
      "Food": "Groceries",
      "Savings": "Savings",
      "Household": "Household",
      "Sport": "Sport",
      "Default": "Blank"
  };

  var iconPath = categoryMapping[icon] || categoryMapping.Default;

  console.log(icon);
    if (type === "category")
    {
      return {
        backgroundImage: `url(${require(`../../assets/icons/icons_raw/${iconPath}.png`)})`,
      };
    }

    else if (type === "goals") return { background: randomColor };
  })();

  return (
    <>
      <div
        className="card"
        onClick={() => {
          onClick(title);
        }}
      >
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
            {price < 0 && "-"} € {price < 0 ? price.toString().slice(1) : price}
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;
