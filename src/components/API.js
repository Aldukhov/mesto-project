import { renderLoading,closePopup } from "./modal";

const config = {

    headers: {
      authorization: 'fe25609f-c231-4126-8459-9808870edc8e',
      'Content-Type': 'application/json'
    }
  }

function loadDataUser(changeProfileData,cardsContainer,createCard,loadDataCards) {

    fetch('https://nomoreparties.co/v1/plus-cohort-25/users/me ', {
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Oops: ${res.status}`);
        })
        .then((data) => {
            changeProfileData(data);
            loadDataCards(cardsContainer,createCard);
        })

        .catch((err) => {
            console.log(err);
        })

}



function loadDataCards(cardsContainer,createCard,addMethond = 'append') {
    return fetch('https://nomoreparties.co/v1/plus-cohort-25/cards', {
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Oops: ${res.status}`);
        })
        .then((data) => {
            for (let i = 0; i < data.length; i++) {

                    cardsContainer.append(createCard(data[i]));
            }
          
        })

        .catch((err) => {
            console.log(err);
        })
}

function saveOnServUser(popupNameInput,popupPostInput,profileName,profilePost,evt,popupPerson) {
    return fetch('https://nomoreparties.co/v1/plus-cohort-25/users/me', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: popupNameInput.value,
            about: popupPostInput.value
        })
    }) .then((res) => {
        if (res.ok) {
            profileName.textContent = popupNameInput.value;
            profilePost.textContent = popupPostInput.value;
            return
        }

        return Promise.reject(`Oops: ${res.status}`);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        renderLoading(false,evt.target.querySelector('.popup__button'));
        closePopup(popupPerson);
      });
}

function saveOnServCard(popupLinkInput, popupTitleInput,cardsContainer,evt,popupAddImage,createCard) {
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
    .then ((data)=> {
        cardsContainer.prepend(createCard(data));
    })
    .catch((err) => {
        console.log(err);
    })

    .finally(()=> {
        renderLoading(false,evt.target.querySelector('.popup__button'));
        closePopup(popupAddImage);
    })
}

function addLike(cardId,card,likeQant,evtTarget) {

    fetch(`https://nomoreparties.co/v1/plus-cohort-25/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    }) .then((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Oops: ${res.status}`);
    })
    .then((data) => {
        likeQant(data.likes,card);
        evtTarget.classList.add('elements__like_active');
    })

    .catch((err) => {
        console.log(err);
    })
}

function deleteLike(cardId,card,likeQant,evtTarget) {
    fetch(`https://nomoreparties.co/v1/plus-cohort-25/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    }) .then((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Oops: ${res.status}`);
    })
    .then((data) => {
        evtTarget.classList.remove('elements__like_active');
        likeQant(data.likes,card);
    })

    .catch((err) => {
        console.log(err);
    })
}

function saveOnServAvatar(avatar,imgAvatar,evt,popupAvatar) {
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
    .catch((err) => {
        console.log(err);
    })
    .finally(()=> {
        renderLoading(false,evt.target.querySelector('.popup__button'));
  closePopup(popupAvatar);
    })
    
}

function deleteCardAPI(cardId,listItem) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-25/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    }) .then((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Oops: ${res.status}`);
    })
    .then((data) => {
        likeQant(data.likes,card);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(()=>{
        listItem.remove();
    })
    

}

export { loadDataUser, loadDataCards, saveOnServUser, saveOnServCard,addLike,deleteLike,saveOnServAvatar,deleteCardAPI };