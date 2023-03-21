import "./bbbtn.css";

// SUBMIT by default

function BbBtn({ onClick, type, content }) {
  return (
    <>
      <div className="bbbtn-wrapper">
        <button
          // onClick={() => props.onClick()}
          type={type === undefined ? "submit" : "button"}
          className="bbbtn"
          onClick={onClick}
        >
          <span>{content}</span>
        </button>
      </div>
    </>
  );
}

export default BbBtn;
