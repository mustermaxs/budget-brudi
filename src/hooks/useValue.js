import { useState } from "react";

function useValue(initialValues) {
  const [inputValue, setValue] = useState(initialValues);

  const handleChange = (inputName, event) => {
    const newValue =
      event.target.value !== undefined
        ? event.target.value
        : event.target.dataset.value;
    setValue((prevValue) => ({
      ...prevValue,
      [inputName]: newValue,
    }));
  };

  return [inputValue, handleChange, setValue];
}

export default useValue;
