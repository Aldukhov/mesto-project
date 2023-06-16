const config = {

    headers: {
      authorization: 'fe25609f-c231-4126-8459-9808870edc8e',
      'Content-Type': 'application/json'
    }
  }

function loadDataUser(profileName,profilePost,profileAvatar) {

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
            profileName.textContent = data.name;
            profilePost.textContent = data.about;
            profileAvatar.src = data.avatar;
        })

        .catch((err) => {
            console.log(err);
        })

}



function loadDataCards(cardsContainer,createCard) {
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

                const imges = cardsContainer.querySelectorAll('.elements__img');
                if((!Array.from(imges).some((img)=> {return img.id === data[i]._id})))
                  {
                    cardsContainer.append(createCard(data[i]));
                  }
            }
          
        })

        .catch((err) => {
            console.log(err);
        })
}

function saveOnServUser(profileName,profilePost,evt,popupPerson,renderLoading,closePopup) {
    return fetch('https://nomoreparties.co/v1/plus-cohort-25/users/me', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: profileName.textContent,
            about: profilePost.textContent
        })
    }) .then((res) => {
        if (res.ok) {
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

function saveOnServCard(popupLinkInput, popupTitleInput,cardsContainer,evt,popupAddImage,renderLoading,closePopup,createCard) {
    return fetch('https://nomoreparties.co/v1/plus-cohort-25/cards', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: popupTitleInput.value,
            link: popupLinkInput.value
        })
    })  .then((res) => {
        if (res.ok) {
            return loadDataCards(cardsContainer,createCard);
            
        }

        return Promise.reject(`Oops: ${res.status}`);
    })
    .catch((err) => {
        console.log(err);
    })

    .finally(()=> {
        renderLoading(false,evt.target.querySelector('.popup__button'));
        closePopup(popupAddImage);
    })
}

function addLike(cardId,card,likeQant) {

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
    })

    .catch((err) => {
        console.log(err);
    })
}

function deleteLike(cardId,card,likeQant) {
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
        likeQant(data.likes,card);
    })

    .catch((err) => {
        console.log(err);
    })
}

function saveOnServAvatar(avatar,imgAvatar,evt,popupAvatar,renderLoading,closePopup) {
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