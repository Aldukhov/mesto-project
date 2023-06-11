import { profileName, profilePost, 
    profileAvatar, popupLinkInput,popupTitleInput} from "./index.js";
import { createCard, cardsContainer } from "./card.js";

function loadDataUser() {

    return fetch('https://nomoreparties.co/v1/plus-cohort-25/users/me ', {
        headers: {
            authorization: 'fe25609f-c231-4126-8459-9808870edc8e'
        }
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

function loadDataCards() {
    return fetch('https://nomoreparties.co/v1/plus-cohort-25/cards', {
        headers: {
            authorization: 'fe25609f-c231-4126-8459-9808870edc8e'
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Oops: ${res.status}`);
        })
        .then((data) => {
            console.log(data);
            for (let i = 0; i < data.length; i++) {

                cardsContainer.append(createCard(data[i].link, data[i].name,data[i].likes,data[i].owner._id));
            }
        })

        .catch((err) => {
            console.log(err);
        })
}

function saveOnServUser () {
    return fetch ('https://nomoreparties.co/v1/plus-cohort-25/users/me', {
        method: 'PATCH',
        headers: {
            authorization: 'fe25609f-c231-4126-8459-9808870edc8e',
            'Content-Type': 'application/json'
        },  
        body: JSON.stringify({
            name: profileName.textContent,
            about: profilePost.textContent
          })
    })
}

function saveOnServCard () {
    return fetch ('https://nomoreparties.co/v1/plus-cohort-25/cards', {
        method: 'POST', 
        headers: {
            authorization: 'fe25609f-c231-4126-8459-9808870edc8e',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: popupTitleInput.value, 
            link: popupLinkInput.value
        })
    })
}

export { loadDataUser, loadDataCards,saveOnServUser,saveOnServCard };