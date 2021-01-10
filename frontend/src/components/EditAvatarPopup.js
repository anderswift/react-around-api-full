
import { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';
import FormField from './FormField';

/* 
 * Note to reviewer: I really didn't want to use ref here, as it messes up my form validation code and doesn't work with my FormField component, 
 * plus this is not an ideal use case anyway. Please see Card component for a ref example -- used there to remove focus from button after like.  
 */

function EditAvatarPopup({isOpen, isSaving, onClose, onSubmit}) {

  const currentUser= useContext(CurrentUserContext);

  const [avatar, setAvatar]= useState('');
  const [error, setError]= useState('');
  const [submitReady, setSubmitReady]= useState(false);



  function handleChange(e) {
    setAvatar(e.target.value);
    setError(e.target.validity.valid ? '' : e.target.validationMessage);
    setSubmitReady(e.target.validity.valid);
  } 

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({avatar: avatar});
  }

  function handleReset() {
    setAvatar(currentUser.avatar || ''); // prevent undefined value on controlled form field
    setError('');
    setSubmitReady(!!currentUser.avatar); // convert string to boolean to determine button state
  }



  useEffect(() => { 
      setAvatar(currentUser.avatar || ''); // prevent undefined value on controlled form field
      setSubmitReady(!!currentUser.avatar); // convert string to boolean to determine button state
  }, [currentUser]); 


  
  return (
    <PopupWithForm heading="Change profile picture" name="avatar" isOpen={isOpen} onClose={onClose} onReset={handleReset}
      submitText={isSaving ? 'Saving...' : 'Save'} submitReady={submitReady} onSubmit={handleSubmit}>

      <FormField isModal={true} name="profile-avatar" type="url" label="Image link" value={avatar} handleChange={handleChange} error={error} />

    </PopupWithForm>
  );
  
}

export default EditAvatarPopup;
