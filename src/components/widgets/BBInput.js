import "./input.css";

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
        className={
          "bb-input " + (props.size === undefined ? "large" : props.size)
        }
        type="text"
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
        className={
          "bb-input " + (props.size === undefined ? "large" : props.size)
        }
        type={props.type}
      ></input>
    );
  };

  const inputElement = () => {
    if (props.type === "text") return inputTypeText();
    else if (props.type === "currency") return inputTypeCurrency();
    else if (props.type === "date") return inputTypeDate();
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
