import "./contentWrapper.css";

function ContentWrapper(props) {
  return (
    <>
      <div className="contentWrapper">{props.children}</div>
    </>
  );
}

export default ContentWrapper;
