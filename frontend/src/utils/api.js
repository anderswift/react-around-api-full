class Api {

  constructor({ baseUrl, headers }) {
    this._baseUrl= baseUrl;
    this._headers= headers;
  }
  
  
  getInitialCards() {
    return fetch(this._baseUrl + 'cards', {
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      } 
      return Promise.reject(`Error: ${res.status}`);
    });
  } 


  getUserInfo() {
    return fetch(this._baseUrl + 'users/me', {
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      } 
      return Promise.reject(`Error: ${res.status}`);
    });
  } 


  addCard(data) {
    return fetch(this._baseUrl + 'cards', {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(res => {
      if (res.ok) {
        return res.json();
      } 
      return Promise.reject(`Error: ${res.status}`);
    }); 
  }


  deleteCard(cardId) {
    return fetch(this._baseUrl + 'cards/' + cardId, {
      method: "DELETE",
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      } 
      return Promise.reject(`Error: ${res.status}`);
    }); 
  }
  

  updateLikes(cardId, liked) {
    let method= 'DELETE';
    if(liked) method= 'PUT';

    return fetch(this._baseUrl + 'cards/likes/' + cardId, {
      method: method,
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      } 
      return Promise.reject(`Error: ${res.status}`);
    }); 
  }


  setUserInfo(data) {
    return fetch(this._baseUrl + 'users/me', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(res => {
      if (res.ok) {
        return res.json();
      } 
      return Promise.reject(`Error: ${res.status}`);
    }); 
  }
  

  setUserAvatar(data) {
    return fetch(this._baseUrl + 'users/me/avatar', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(res => {
      if (res.ok) {
        return res.json();
      } 
      return Promise.reject(`Error: ${res.status}`);
    }); 
  }

}


export const api= new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-6/",
  headers: {
    authorization: "95a5b594-7318-496e-ada2-f96a00133f51",
    "Content-Type": "application/json"
  }
}); 
