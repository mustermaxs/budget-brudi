import "./input.css";

// props.size => large/medium/small

function InputText(props) {
  return (
    <>
      {props.label === undefined ? (
        ""
      ) : (
        <label className="bb-input-label" htmlFor={props.id}>
          {props.label}
        </label>
      )}

      <input
        placeholder={props.placeholder}
        id={props.id}
        name={props.name}
        defaultValue={props.value}
        className={
          "bb-input " + (props.size === undefined ? "large" : props.size)
        }
        type="text"
        onChange={props.onChange}
      ></input>
    </>
  );
}

export default InputText;
