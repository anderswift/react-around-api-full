
import { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';
import FormField from './FormField';



function EditProfilePopup({isOpen, isSaving, onClose, onSubmit}) {

  const currentUser= useContext(CurrentUserContext);

  const [values, setValues]= useState({ name: '', about: '' });
  const [errors, setErrors]= useState({});
  const [submitReady, setSubmitReady]= useState(false);


  
  function handleChange(e) {
    const name= e.target.name.split('-').pop();
    setValues({...values, [name]: e.target.value });
    
    if(e.target.validity.valid) {
      const updatedErrors= {...errors, [name]: '' }
      setErrors(updatedErrors);
      setSubmitReady(!Object.values(updatedErrors).some(i => i)); // enable submit if no error messages
    } else {
      setErrors({...errors, [name]: e.target.validationMessage });
      setSubmitReady(false);
    }
  } 

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
  }

  const handleReset= () => {
    setValues({ name: currentUser.name || '', about: currentUser.about || '' }); // prevent undefined value on controlled form field
    setErrors({});
    setSubmitReady(!!(currentUser.name && currentUser.about));
  }


  
  useEffect(() => { 
    setValues({ name: currentUser.name, about: currentUser.about });
    setSubmitReady(true);
  }, [currentUser]); 
  


  
  return (
    <PopupWithForm heading="Edit profile" name="profile" isOpen={isOpen} onClose={onClose} onReset={handleReset}
      submitText={isSaving ? 'Saving...' : 'Save'} submitReady={submitReady} onSubmit={handleSubmit}>

      <FormField isModal={true} name="profile-name" label="Name" minMax={[2, 40]} handleChange={handleChange} value={values.name} error={errors.name} />
      <FormField isModal={true} name="profile-about" label="About me" minMax={[2, 200]} handleChange={handleChange} value={values.about} error={errors.about}  />
    
    </PopupWithForm>
  );
  
}

export default EditProfilePopup;
