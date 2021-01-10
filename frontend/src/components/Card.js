function Card({card, currentUserId, onCardClick, onDeleteClick, onLikeClick}) {

  const currentUserOwns= card.owner._id === currentUserId;
  const currentUserLikes= card.likes.some(user => user._id === currentUserId);

  const handleClick= () => { onCardClick(card); }
  const handleDeleteClick= () => { onDeleteClick(card); }
  const handleLikeUnlike= (e) => { onLikeClick(card, e); }



  return (
    <li className="photo" id={card._id}>
      <img className="photo__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="photo__meta">
        <h2 className="photo__caption">{card.name}</h2>
        <button type="button" aria-label="Like"
          className={`photo__like button${currentUserLikes ? ' photo__like_on' : ''}`} 
          onClick={handleLikeUnlike}
        >
          <span className="photo__like-count">{card.likes.length}</span>
        </button>
      </div>
      {currentUserOwns && <button type="reset" className="photo__delete button" aria-label="Delete" onClick={handleDeleteClick}></button>}
    </li>
  );

}

export default Card;
