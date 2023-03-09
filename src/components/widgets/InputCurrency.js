import "./input.css";

// props.size => large/medium/small

function InputCurrency(props) {
  return (
    <>
      {props.label == undefined ? (
        ""
      ) : (
        <label className="bb-input-label" for={props.id}>
          {props.label}
        </label>
      )}
      <div className="currencySymbol">
        {props.currency == undefined ? "€" : props.currency}
      </div>
      <input
        placeholder={props.placeholder}
        id={props.id}
        name={props.name}
        className={
          "bb-input currency " +
          (props.size == undefined ? "large" : props.size)
        }
        type="number"
        step="0.01"
      ></input>
    </>
  );
}

export default InputCurrency;
