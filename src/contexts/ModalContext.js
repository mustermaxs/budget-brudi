import { createContext, useContext, useEffect, useState, useRef } from "react";
import MsgModal from "../components/widgets/MsgModal";

/**
 * ####### USAGE #######
 * context provider is anchored at "Layout.js"
 * use `const { msgModal } = useMsgModal()` in components where
 * you want to use the MsgModal to show notifications
 * use either msgModal.set({ title, message, type, isVisible })
 * or msgModal.setTitle(), msgModal.show( true | false ), msgModal.setMessage(),
 * msgModal.setType("normal" | "error")
 * to configure the MsgModal

 * !!! CAN ONLY BE USED INSIDE useEffect Hook !!!


example:
import { useMsgModal } from "../contexts/ModalContext";


  const {msgModal} = useMsgModal();

  msgModal.setTitle("Warning");
  msgModal.setMessage("No internet connection")
  msgModal.show(true);
  msgModal.set({
    title: "Warning",
    message: "Something didn't work...",
    type: "error"
  });
 * ####################
 * ####################
 */

const MsgModalContext = createContext({
  type: "error",
  title: "Title",
  message: "Message...",
  isVisible: false,
});

const MsgModalContextProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
// const isVisible = useRef(false);
  const [title, setTitle] = useState("Warning");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("error");

//   const setIsVisible = (bla) => isVisible.current = bla;

  const msgModal = (() => {
    const _this = {};

    _this.show = () => setIsVisible(true);
    _this.hide = () => setIsVisible(false);
    _this.setTitle = (newTitle) => setTitle(newTitle);
    _this.setMessage = (newMsg) => setMessage(newMsg);
    _this.setType = (newType) => setType(newType);

    _this.set = (config) => {
      if ("isVisible" in config) setIsVisible(config["isVisible"]);
      if ("title" in config) setTitle(config["title"]);
      if ("message" in config) setMessage(config["message"]);
      if ("type" in config) setType(config["type"]);
    };

    return _this;
  })();

  const handleClick = () => {
    setIsVisible(false);
    console.log("clicked");
  };

  return (
    <MsgModalContext.Provider value={{ msgModal }}>
      <MsgModal
        type={type}
        isVisible={isVisible}
        setIsVisible={setIsVisible} // Pass setIsVisible as a prop
        handleClick={handleClick} // Pass handleClick as a prop
        title={title}
        message={message}
      />
      {children}
    </MsgModalContext.Provider>
  );
};

function useMsgModal() {
  const context = useContext(MsgModalContext);

  if (!context)
    throw new Error(
      "useModalCOntext must be used under <MsgModalContextProvider />"
    );

  return context;
}

export { useMsgModal, MsgModalContext, MsgModalContextProvider };
