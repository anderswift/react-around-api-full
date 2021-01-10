import { useState, useEffect } from 'react';

import { api } from '../utils/api.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import avatar from '../images/avatar.png'; // default avatar (black 1 pixel)

import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';
import PopupWithImage from './PopupWithImage';



function AroundTheUS() {

  const [currentUser, setCurrentUser]= useState({name: '', about: '', avatar: avatar});
  const [cards, setCards]= useState([]);
  const [selectedCard, selectCard]= useState({});
  const [isSaving, setIsSaving]= useState(false);

  const [isProfilePopupOpen, setIsProfilePopupOpen]= useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen]= useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen]= useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen]= useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen]= useState(false);



  const handleEditAvatarClick= () => { setIsAvatarPopupOpen(true); setListener(true); }
  const handleEditProfileClick= () => { setIsProfilePopupOpen(true); setListener(true); }
  const handleAddPlaceClick= () => { setIsAddPlacePopupOpen(true); setListener(true); }

  const closeAllPopups= () => {
    setIsAvatarPopupOpen(false);
    setIsProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePlacePopupOpen(false);

    setIsImagePopupOpen(false);
    setTimeout(() => { selectCard({}); }, 200); // wait until fade animation completes before removing selected card data
    
    setListener(false);
  }

  const closeOnEsc= (e) => { 
    if(e.key === 'Escape') {
      closeAllPopups(); 
    }
  }

  const setListener= (listen) => {
    listen ?
      document.addEventListener('keyup', closeOnEsc) :
      document.removeEventListener('keyup', closeOnEsc);
  }

  const handleCardClick= (card) => {
    selectCard(card);
    setIsImagePopupOpen(true);
    setListener(true);
  }

  const handleDeleteClick= (card) => {
    selectCard(card);
    setIsDeletePlacePopupOpen(true);
    setListener(true);
  }

  

  const updateProfile= (userData) => {
    setIsSaving(true);
    api.setUserInfo(userData)
    .then((user) => {
      setCurrentUser(user);
      closeAllPopups();
      setTimeout(() => { setIsSaving(false); }, 200); // wait until fade animation completes to reset button text
    })
    .catch((err) => {
      console.log(err);
      setIsSaving(false);
    });
  }

  const updateAvatar= (avatarData) => {
    setIsSaving(true);
    api.setUserAvatar(avatarData)
    .then((user) => {
      setCurrentUser(user);
      closeAllPopups();
      setTimeout(() => { setIsSaving(false); }, 200);
    })
    .catch((err) => {
      console.log(err);
      setIsSaving(false);
    });
    
  }

  const addCard= (cardData, e) => {
    setIsSaving(true);
    api.addCard(cardData)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
      setTimeout(() => { setIsSaving(false); }, 200);
      e.target.reset(); // empty the form
    })
    .catch((err) => {
      console.log(err);
      setIsSaving(false);
    });
  }

  const likeUnlikeCard= (card, e) => {
    const currentUserLikes= card.likes.some(user => user._id === currentUser._id);
    api.updateLikes(card._id, !currentUserLikes)
      .then((updatedCard) => {
        const newCards = cards.map((c) => c._id === card._id ? updatedCard : c);  
        setCards(newCards);
        e.target.blur(); // prevents button from staying selected and highlighted after action completes
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const deleteCard= (cardId) => {
    setIsSaving(true);
    api.deleteCard(cardId)
    .then((response) => {
      const newCards = cards.filter((card) => card._id !== cardId);  
      setCards(newCards);
      closeAllPopups();
      setTimeout(() => { setIsSaving(false); }, 200);
    })
    .catch((err) => {
      console.log(err);
      setIsSaving(false);
    });
  }



  useEffect(() => {
    api.getUserInfo()
    .then((user) => {
      setCurrentUser(user);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    if(!currentUser) return;
    api.getInitialCards()
      .then(setCards)
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Main 
        cards={cards}
        onEditAvatar={handleEditAvatarClick} 
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onDeleteClick={handleDeleteClick}
        onLikeClick={likeUnlikeCard}
      />

      <EditProfilePopup isOpen={isProfilePopupOpen} onClose={closeAllPopups} onSubmit={updateProfile} isSaving={isSaving} />
      <EditAvatarPopup isOpen={isAvatarPopupOpen} onClose={closeAllPopups} onSubmit={updateAvatar} isSaving={isSaving} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onSubmit={addCard} isSaving={isSaving} />
      <DeletePlacePopup isOpen={isDeletePlacePopupOpen} onClose={closeAllPopups} onSubmit={deleteCard} cardId={selectedCard._id} isSaving={isSaving} />

      <PopupWithImage isOpen={isImagePopupOpen} onClose={closeAllPopups} card={selectedCard} />
    </CurrentUserContext.Provider>
  );

}

export default AroundTheUS;
