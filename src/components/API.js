import { renderLoading,closePopup } from "./modal";

const config = {

    headers: {
      authorization: 'fe25609f-c231-4126-8459-9808870edc8e',
      'Content-Type': 'application/json'
    }
  }

function loadDataUser() {

   return fetch('https://nomoreparties.co/v1/plus-cohort-25/users/me ', {
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Oops: ${res.status}`);
        })
    
}



function loadDataCards() {
    return fetch('https://nomoreparties.co/v1/plus-cohort-25/cards', {
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Oops: ${res.status}`);
        })
}

function saveOnServUser(popupNameInput,popupPostInput) {
    return fetch('https://nomoreparties.co/v1/plus-cohort-25/users/me', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: popupNameInput.value,
            about: popupPostInput.value
        })
    }) 
}

function saveOnServCard(popupLinkInput, popupTitleInput) {
    return fetch('https://nomoreparties.co/v1/plus-cohort-25/cards', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: popupTitleInput.value,
            link: popupLinkInput.value
        })
    })  .then((res) => {
        if (res.ok) {
            return res.json();        
        }

        return Promise.reject(`Oops: ${res.status}`);
    })
    
}

function addLike(cardId) {

   return fetch(`https://nomoreparties.co/v1/plus-cohort-25/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    }) .then((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Oops: ${res.status}`);
    })
    
}

function deleteLike(cardId) {
 return  fetch(`https://nomoreparties.co/v1/plus-cohort-25/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    }) .then((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Oops: ${res.status}`);
    })
}

function saveOnServAvatar(avatar,imgAvatar) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-25/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers, body: JSON.stringify({
            avatar: avatar
            
        })
    }) .then((res) => {
        if (res.ok) {
            return imgAvatar.setAttribute('src',avatar); 
        }

        return Promise.reject(`Oops: ${res.status}`);
    })
    
}

function deleteCardAPI(cardId) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-25/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    }) .then((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Oops: ${res.status}`);
    })
    

}

export { loadDataUser, loadDataCards, saveOnServUser, saveOnServCard,addLike,deleteLike,saveOnServAvatar,deleteCardAPI };