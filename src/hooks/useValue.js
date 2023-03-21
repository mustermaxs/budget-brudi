import { useState } from "react";

function useValue(initialValues) {
  const [inputValue, setValue] = useState(initialValues);

  const handleChange = (inputName, newValue) => {
    setValue((prevValue) => ({
      ...prevValue,
      [inputName]: newValue.target.value,
    }));
    console.log(newValue.target.value);
  };

  return [inputValue, handleChange];
}

export default useValue;
