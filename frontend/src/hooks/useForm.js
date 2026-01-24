import { useState } from 'react';

const useForm = (defaultFormState = {}) => {
  const [formState, setFormState] = useState(defaultFormState);

  const handleFormChange = (event) => {
    const { name, value, files } = event.target;

    // new copy
    const newFormState = { ...formState };

    newFormState[name] = value;

    if (name === 'photo') {
      newFormState.photo = files[0];
    }

    setFormState(newFormState);
  };

  const updateFormField = (fieldName, fieldValue) => {
    const newFormState = { ...formState };

    newFormState[fieldName] = fieldValue;

    setFormState(newFormState);
  };

  return { formState, handleFormChange, updateFormField };
};

export default useForm;
