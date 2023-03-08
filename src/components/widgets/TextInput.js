import "./input.css";

function TextInput(props) {
  return (
    <>
      <div className="bb-inputWrapper">
        <label for={props.inputId}>{props.label}</label>
        <input
          placeholder={props.placeholder}
          id={props.inputId}
          name={props.name}
          className="bb-input large"
          type="text"
        ></input>
      </div>
    </>
  );
}

export default TextInput;
