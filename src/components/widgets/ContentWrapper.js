import "./contentWrapper.css";
import {Spinner} from "./Spinner";

function ContentWrapper(props) {
  return (
    <>
      <div className="contentWrapper">
        <Spinner />
        {props.children}
        </div>
    </>
  );
}

export default ContentWrapper;
