import { useEffect, useState } from "react";
import "./MsgModal.css";

function MsgModal({
  title,
  message,
  handleClick,
  isVisible,
  type,
  setIsVisible,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const style = ["error", "normal"].includes(type) ? type : "error";

  useEffect(() => {
    setIsOpen(isVisible);
  }, [isVisible]);

  const handleClose = () => {
    setIsOpen(false);
    setIsVisible(false);
  };

  // if (!isOpen) return null;
  return (
    <>
      {isOpen &&(
        <div className="msgModal">
          <div id="decoBar" className={style}>
            <button onClick={handleClose} id="close">
              &#128473;
            </button>
          </div>
          <div id="text">
            <h4>{title}</h4>
            <p>{message}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default MsgModal;
