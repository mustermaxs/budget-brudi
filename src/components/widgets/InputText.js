import "./input.css";

// props.size => large/medium/small

function InputText(props) {
  // const handleChange = (ev) => {
  //   props.onChange(ev.target.value);
  // };
  return (
    <>
      {props.label == undefined ? (
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
        type="text"
        value={props.value}
        onChange={(ev) => props.onChange(ev.target.value)}
      ></input>
    </>
  );
}

export default InputText;
