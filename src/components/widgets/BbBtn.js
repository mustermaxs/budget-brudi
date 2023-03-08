import "./bbbtn.css";

function BbBtn(props) {
  return (
    <>
      <button type="button" className="bbbtn">
        <span>{props.content}</span>
      </button>
    </>
  );
}

export default BbBtn;
