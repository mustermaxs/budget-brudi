import "./input.css";

// props.size => large/medium/small

function Input(props) {
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
        className={
          "bb-input " + (props.size == undefined ? "large" : props.size)
        }
        type={props.type}
      ></input>
    </>
  );
}

export default Input;
