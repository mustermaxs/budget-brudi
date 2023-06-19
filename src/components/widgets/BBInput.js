import React from 'react';
import './input.css';

// props.size => large/medium/small

/**
 * ! SUPER MESSY, I'm sorry :(
 * muss man großteils wsl eh nur über das type-attribut
 * regeln und nur f. die css-klassen conditionals schreiben
 * ... mach ich morgen
 *
 */

function BBInput(props) {
  // const handleChange = (ev) => {
  //   props.onChange(ev.target.value);
  // };
  const inputTypeText = () => {
    return (
      <input
        placeholder={props.placeholder}
        id={props.id}
        name={props.name}
        value={props.value}
        disabled={props.disabled}
        className={
          "bb-input " + (props.size === undefined ? "large" : props.size)
        }
        type="text"
        onChange={props.onChange}
      ></input>
    );
  };
  const inputTypePassword = () => {
    return (
      <input
        placeholder={props.placeholder}
        id={props.id}
        name={props.name}
        value={props.value}
        className={
          "bb-input " + (props.size === undefined ? "large" : props.size)
        }
        type="password"
        onChange={props.onChange}
      ></input>
    );
  };

  const inputTypeCurrency = () => {
    return (
      <div>
        <input
          placeholder={props.placeholder}
          id={props.id}
          name={props.name}
          onChange={props.onChange}
          value={props.value}
          disabled={props.disabled}
          className={
            "bb-input currency " +
            (props.size === undefined ? "large" : props.size)
          }
          type="number"
          step="0.01"
        ></input>
        <div className="currencySymbol">
          {props.currency === undefined ? "€" : props.currency}
        </div>
      </div>
    );
  };

  const inputTypeDate = () => {
    return (
      <input
        placeholder={props.placeholder}
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        disabled={props.disabled}
        className={
          "bb-input " + (props.size === undefined ? "large" : props.size)
        }
        type={props.type}
      ></input>
    );
  };

  const inputTypeSelect = () => {
    return (
      <select
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        className={
          "bb-input " + (props.size === undefined ? "large" : props.size)
        }
      >
        {props.options.map((option, index) => (
          <option value={option.value} key={index}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };

  const inputElement = () => {
    if (props.type === "text") return inputTypeText();
    else if (props.type === "currency") return inputTypeCurrency();
    else if (props.type === "date") return inputTypeDate();
    else if (props.type === "select") return inputTypeSelect();
    else if (props.type === "password") return inputTypePassword();
    else return inputTypeText();
  };

  return (
    <>
      {props.label === undefined ? (
        ""
      ) : (
        <label className="bb-input-label" htmlFor={props.id}>
          {props.label}
        </label>
      )}
      {inputElement()}
    </>
  );
}

export default BBInput;
