import { useState } from 'react';

import PopupWithForm from './PopupWithForm';
import FormField from './FormField';



function AddPlacePopup({isOpen, isSaving, onClose, onSubmit}) {

  const [values, setValues]= useState({ name: '', link: '' });
  const [errors, setErrors]= useState({});
  const [submitReady, setSubmitReady]= useState(false);



  function handleChange(e) {
    const name= e.target.name.split('-').pop();
    setValues({...values, [name]: e.target.value });
    
    if(e.target.validity.valid) {
      const updatedErrors= {...errors, [name]: '' }
      setErrors(updatedErrors);
      const errorValues= Object.values(updatedErrors);
      if(errorValues.length === 2) setSubmitReady(!errorValues.some(i => i)); // enable submit if both fields checked and no error messages
    } else {
      setErrors({...errors, [name]: e.target.validationMessage });
      setSubmitReady(false);
    }
  } 

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values, e);
  }

  function handleReset(e) {
    setErrors({});
    setSubmitReady(false);
  }



  return (
    <PopupWithForm heading="New place" name="photo" isOpen={isOpen} onClose={onClose} onReset={handleReset}
      submitText={isSaving ? 'Saving...' : 'Create'} submitReady={submitReady} onSubmit={handleSubmit}>

      <FormField isModal={true} name="photo-name" label="Title" minMax={[2, 30]} error={errors.name} handleChange={handleChange} />
      <FormField isModal={true} name="photo-link" type="url" label="Image link" error={errors.link} handleChange={handleChange} />

    </PopupWithForm>
  );

}

export default AddPlacePopup;
