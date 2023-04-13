import { useState } from "react";

function useSplashScreen(initialVal = null) {
  const [state, setState] = useState(null);

  // setState(" hide");

  const hide = () => {
    setState(" hide");
  };
  const show = () => {
    setState("");
  };

  const showForSec = (seconds) => {
    setState("");

    setTimeout(() => {
      setState(" hide");
    }, seconds);
  };

  return [state, hide, show, showForSec];
}

export default useSplashScreen;
