import "./bbbtn.css";

// SUBMIT by default

function BbBtn({ onClick, type, content, position }) {
  const className = () => {
    var classNameBase = "bbbtn-wrapper";
    if (position === "bottom") classNameBase += " bottom";

    return classNameBase;
  };
  return (
    <>
      <div className={className()}>
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
