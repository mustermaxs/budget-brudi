import "./bbbtn.css";

// SUBMIT by default

function BbBtn(props) {
  return (
    <>
      <div className="bbbtn-wrapper">
        <button
          type={props.type == undefined ? "submit" : "button"}
          className="bbbtn"
          onClick={props.onClick}
        >
          <span>{props.content}</span>
        </button>
      </div>
    </>
  );
}

export default BbBtn;
