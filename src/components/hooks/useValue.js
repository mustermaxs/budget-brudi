import { useState } from "react";

function useValue(initialValues) {
  const [inputValue, setValue] = useState(initialValues);

  const handleChange = (inputName, newValue) => {
    setValue((prevValue) => ({
      ...prevValue,
      [inputName]: newValue,
    }));
    console.log(newValue);
  };

  return [inputValue, handleChange];
}

export default useValue;
