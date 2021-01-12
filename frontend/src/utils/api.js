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
  baseUrl: "https://api.aroundtheus.anderswift.com/",
  headers: {
    authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmZiZDJiMmEzNzk3MzUyOTIxYzgzOGQiLCJpYXQiOjE2MTA0OTM2MjUsImV4cCI6MTYxMTA5ODQyNX0.VFKUAtsEeL8djlaJdfYMiOYgfkmIgoo3gGoB84C1Ebo",
    "Content-Type": "application/json"
  }
}); 
