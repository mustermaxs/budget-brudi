import { useState } from "react";
import "./splashscreen.css";
import { useEffect } from "react";

function SplashScreen({ showFor }) {
  const [state, setState] = useState("");
  // props.show()

  useEffect(() => {
    handleScreen(showFor);

    return () => {};
  }, [showFor]);

  const handleScreen = (seconds) => {
    setTimeout(() => {
      setState("hide");
    }, seconds * 1000);
  };

  return (
    <>
      <div className={"splash-screen-container " + state}>
        <div id="logo-container"></div>
      </div>
    </>
  );
}

export default SplashScreen;
