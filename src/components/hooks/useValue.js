import { useState } from "react";

function useValue(initialValues) {
  const [inputValue, setValue] = useState(initialValues);

  const handleChange = (inputName, event) => {
    setValue((prevValue) => ({
      ...prevValue,
      [inputName]: event.target.value,
    }));
  };

  return [inputValue, handleChange];
}

export default useValue;
