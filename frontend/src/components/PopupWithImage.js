function PopupWithImage(props) {
  
  return (
    <div className={`popup popup_dark ${props.isOpen ? 'popup_active' : ''}`}>  
      <div className="popup__item photo-viewer">
        <figure className="photo-viewer__figure">
          <img className="photo-viewer__image" src={props.card.link} alt={props.card.name} />
          <figcaption className="photo-viewer__caption">{props.card.name}</figcaption>
        </figure>
        <button type="button" className="popup__exit photo-viewer__exit button" aria-label="Close Photo Viewer" onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithImage;
