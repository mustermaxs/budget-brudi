import styled from "@emotion/styled";
import { Slider, Switch, createTheme } from "@mui/material";


const themeParams = {
  railHeight: 9,
  thumbSize: 23
}

const theme = createTheme({
    components: {
      MuiSlider: {
        styleOverrides: {
          thumb: {
            color: "white",
            border: "0.3px solid #BDBDBD",
            height: themeParams.thumbSize,
            width: themeParams.thumbSize,
            boxShadow: "0px 1px 2px rgba(0,0,0,0.1)"

          },
          rail: {
            color: "#EBEBEB",
            height: themeParams.railHeight,
            boxShadow: "inset 0px 1px 3px black"
          },
          track: {
            color: "#000F79",
            height: themeParams.railHeight,
          },
          mark: {
            display: "none"
          }
        }
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            // width: 70,
            // height: 50,
            // borderRadius: 100
          },
          thumb: {
            // height: themeParams.thumbSize -2,
            // width: themeParams.thumbSize -2,
            border: "0.4px solid gray",
            color: "white",
            ".Mui-checked.Mui-checked + &": {
              backgroundColor: "black"
            },
          },
          track: {
            borderRadius: 100,
            // height: themeParams.thumbSize,
            // width: 70,
            backgroundColor: "grey",
            boxShadow: "inset 0px 1px 2px black",
            ".Mui-checked.Mui-checked + &": {
              opacity: 0.9,
              backgroundColor: "#000F79"
            }
          },
        }
      }

    }
  });


  export {theme};