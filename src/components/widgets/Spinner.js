import { React, useEffect, useRef, useState } from "react";
import "./Spinner.css";

function Spinner()
{
    const [showSpinner, setShowSpinner] = useState(false);
    const nbrOfSubscribers = useRef(0);

    useEffect(() => {
        document.addEventListener("loadingAnim", (ev) => {
            if (ev.detail.showSpinner)
            {
                nbrOfSubscribers.current++;
                !showSpinner && setShowSpinner(true);
            }
            else
            {
                --nbrOfSubscribers.current;

                if (nbrOfSubscribers > 0)
                    return;
                
                setShowSpinner(false);
            }

        });
    })

    return (
        <>
           {showSpinner && <div className="loader-container">
          <div className="spinner"></div>
        </div>}
        </>
    )
}

const loadingAnim = (function ()
{
    const _this = {};
    const showEvent = new CustomEvent("loadingAnim", {detail:{showSpinner: true}});
    const hideEvent = new CustomEvent("loadingAnim", {detail:{showSpinner: false}});

    _this.show = () => {
        document.dispatchEvent(showEvent);
        return;
    }

    _this.hide = () => {
        document.dispatchEvent(hideEvent);
        return;
    }

    return _this;
})();

export {Spinner, loadingAnim};