import "./input.css";

// props.size => large/medium/small

function InputCurrency(props) {
  return (
    <>
      {props.label === undefined ? (
        ""
      ) : (
        <label className="bb-input-label" htmlFor={props.id}>
          {props.label}
        </label>
      )}
      <div>
        <input
          placeholder={props.placeholder}
          id={props.id}
          name={props.name}
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
    </>
  );
}

export default InputCurrency;
