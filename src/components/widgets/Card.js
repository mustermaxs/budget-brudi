import React, { useState } from "react";
import "./Card.css";
import getRandomInt from "../../utils/Random";
// import images from "../../assets/icons/food.png";

const Card = (props) => {
  const [tagState, setTagState] = useState(props.tags);

  // TODO import colorlabels from external resource?
  //* MOCK
  const colorLabels = ["#EAC435", "#345995", "#07A0C3", "#FB4D3D", "#CA1551"];
  const randomColor = colorLabels[getRandomInt(0, colorLabels.length - 1)];
  const iconStyle = (() => {
    if (props.type === "category")
      return {
        backgroundImage: `url(${require(`../../assets/icons/icons_raw/${props.icon}.png`)})`,
      };
    else if (props.type === "goals") return { background: randomColor };
  })();

  console.log(iconStyle);
  return (
    <div className="card">
      <div className="icon-container" style={iconStyle}>
        {/* <img src={image} alt="icon" /> */}
      </div>
      <div className="text-container">
        <h2 className="title">{props.title}</h2>
        <p className="date">{props.date}</p>
        {props.tags !== undefined && (
          <div className="tags">
            {tagState.map((tag) => (
              <div className="tag" key={`${props.title}-${tag}`}>
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="price-container">
        <p className={`price ${props.price > 0 ? "green" : "red"}`}>
          € {props.price}
        </p>
      </div>
    </div>
  );
};

export default Card;
