function InfoTooltip(props) {
  
  return (
    <div className={`popup ${props.isOpen ? 'popup_active' : ''}`}>  
      <div className={`popup__item modal modal_tooltip_${props.type}`}>
        <p className="modal__heading">{props.children}</p>
        <button type="reset" className="popup__exit button" aria-label="Close" onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default InfoTooltip;