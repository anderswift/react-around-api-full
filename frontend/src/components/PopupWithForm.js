import { useEffect, useRef } from "react";

function PopupWithForm(props) {

  const formRef= useRef();



  const resetOnEsc= (e) => { 
    if(e.key === 'Escape') {
      formRef.current.reset(); 
    }
  }



  useEffect(() => {
    if(props.isOpen) document.addEventListener('keyup', resetOnEsc);
    else document.removeEventListener('keyup', resetOnEsc);
  }, [props.isOpen]);

  return (
    <div className={`popup ${props.isOpen ? 'popup_active' : ''}`}>
      <form ref={formRef} name={`${props.name}-form`} className={`popup__item form modal modal_form_${props.name}`} onSubmit={props.onSubmit} onReset={() => setTimeout(() => { props.onReset && props.onReset(); }, 200)}>
        
        <h3 className="form__heading modal__heading">{props.heading}</h3>
        
        {props.children}
        
        <button type="submit" className={`button form__button modal__button modal__button_type_save${!props.submitReady && ' form__button_disabled modal__button_disabled'}`} name={`${props.name}-submit`}>{props.submitText}</button>
        
        <button type="reset" className="popup__exit button" aria-label="Close" onClick={props.onClose}></button>
      </form>
    </div>
  );
  
}

export default PopupWithForm;
