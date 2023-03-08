import ReactDOM from "react-dom/client";
import BbBtn from "../components/widgets/BbBtn";
import ContentWrapper from "../components/widgets/ContentWrapper";
import TextInput from "../components/widgets/TextInput";

function Login() {
  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  };

  return (
    <>
      <ContentWrapper>
        <div style={wrapperStyle}>
          <TextInput
            inputId="username"
            name="username"
            label="Username"
            placeholder="Username"
          />

          <TextInput
            inputId="password"
            name="password"
            label="Password"
            placeholder="Password"
          />
        </div>
        <p>
          {/*BUG das ist nur hier um zu testen was mit dem layout u. button
            passiert wenn die seite höher ist als die screen height */}
          {/* TODO man sollte zum Button runter scrollen können */}
          LoremNostrud aute laborum fugiat duis duis nisi pariatur occaecat
          culpa occaecat eiusmod dolore velit ullamco. Pariatur in minim sunt
          laborum anim do est fugiat qui est aliquip Lorem duis amet. Lorem
          aliqua cillum deserunt labore nulla culpa eu magna minim aute
          voluptate exercitation labore laborum. LoremNostrud aute laborum
          fugiat duis duis nisi pariatur occaecat culpa occaecat eiusmod dolore
          velit ullamco. Pariatur in minim sunt laborum anim do est fugiat qui
          est aliquip Lorem duis amet. Lorem aliqua cillum deserunt labore nulla
          culpa eu magna minim aute voluptate exercitation labore laborum.
          LoremNostrud aute laborum fugiat duis duis nisi pariatur occaecat
          culpa occaecat eiusmod dolore velit ullamco. Pariatur in minim sunt
          laborum anim do est fugiat qui est aliquip Lorem duis amet. Lorem
          aliqua cillum deserunt labore nulla culpa eu magna minim aute
          voluptate exercitation labore laborum. LoremNostrud aute laborum
          fugiat duis duis nisi pariatur occaecat culpa occaecat eiusmod dolore
          velit ullamco. Pariatur in minim sunt laborum anim do est fugiat qui
          est aliquip Lorem duis amet. Lorem aliqua cillum deserunt labore nulla
          culpa eu magna minim aute voluptate exercitation labore laborum.
        </p>
      </ContentWrapper>
      <BbBtn content="Next" />
    </>
  );
}

export default Login;
