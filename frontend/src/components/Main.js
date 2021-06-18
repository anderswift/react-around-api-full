
import { useContext } from 'react';
import { AccountContext } from '../contexts/AccountContext';

import Card from './Card';
import defaultAvatar from '../images/avatar.png';



function Main({cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onDeleteClick, onLikeClick}) {

  const accountData = useContext(AccountContext);

  return (
    <main>
          
      <section className="profile">
        <button className="profile__edit-avatar" aria-label="Edit Avatar" onClick={onEditAvatar}>
          <img className="profile__avatar" src={accountData.avatar || defaultAvatar} alt="Avatar" />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{accountData.name}</h1>
          <button type="button" className="profile__edit-info button" aria-label="Edit profile" onClick={onEditProfile}></button>
          <p className="profile__about">{accountData.about}</p>
        </div>
        
        <button type="button" className="profile__add-image button" aria-label="Add image" onClick={onAddPlace}></button>
      </section>

      
      <section className="photo-grid">
        <ul className="photo-grid__list list">

          {cards.map(card => (
            <Card card={card} key={card._id} currentUserId={accountData._id} onCardClick={onCardClick} onDeleteClick={onDeleteClick} onLikeClick={onLikeClick} />
          ))}

        </ul>
      </section>

    </main>
  );
}

export default Main;
