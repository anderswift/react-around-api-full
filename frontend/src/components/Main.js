
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Card from './Card';



function Main({cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onDeleteClick, onLikeClick}) {

  const currentUser = useContext(CurrentUserContext);
  


  return (
    <main>
          
      <section className="profile">
        <button className="profile__edit-avatar" aria-label="Edit Avatar" onClick={onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar} alt="Avatar" />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button type="button" className="profile__edit-info button" aria-label="Edit profile" onClick={onEditProfile}></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        
        <button type="button" className="profile__add-image button" aria-label="Add image" onClick={onAddPlace}></button>
      </section>

      
      <section className="photo-grid">
        <ul className="photo-grid__list list">

          {cards.map(card => (
            <Card card={card} key={card._id} currentUserId={currentUser._id} onCardClick={onCardClick} onDeleteClick={onDeleteClick} onLikeClick={onLikeClick} />
          ))}

        </ul>
      </section>

    </main>
  );
}

export default Main;
