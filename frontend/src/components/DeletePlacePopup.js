import PopupWithForm from './PopupWithForm';



function DeletePlacePopup({isOpen, isSaving, onClose, cardId, onSubmit}) {

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(cardId);
  }



  return (
    <PopupWithForm heading="Are you sure?" name="delete" isOpen={isOpen} onClose={onClose}
      submitReady={true} submitText={isSaving ? 'Saving...' : 'Yes'} onSubmit={handleSubmit} />
  );
  
}

export default DeletePlacePopup;
