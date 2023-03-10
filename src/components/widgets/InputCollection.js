import "./input.css";

function InputCollection(props) {
  return (
    <>
      {props.label === undefined ? (
        ""
      ) : (
        <label className="bb-input-label">{props.label}</label>
      )}
      <div className="inputCollection">{props.children}</div>
    </>
  );
}

export default InputCollection;
