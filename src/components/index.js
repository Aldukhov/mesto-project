import "../pages/index.css";
import * as pop from './modal.js';
import { cardsContainer,createCard } from "./card";
import { enableValidation } from "./validate";
import { loadDataCards, loadDataUser,saveOnServUser,saveOnServCard,saveOnServAvatar } from "./API";

import {content, popupPicture, popupAddImage, 
  popupFormCard, popupPerson,  
  popupNameInput, popupPostInput, profileName, 
  profilePost, popupImg, popupCaption, 
  popupTitleInput,popupLinkInput, profileAvatar,popupAvatar,
  popupAvatarLink,imgAvatar,userId,profileInform,popupContainPerson,
profile,profileProfileInfo,popupAvatarContainer} from "./utils"

const validObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// Открытие / Закрытие popup
const buttonEdit = profileInform.querySelector('.profile__edit');
// находим все крестики проекта по универсальному селектор
const closeButtons = content.querySelectorAll('.popup__icon');  
//Редактирование имени и информации
loadDataUser()
.then((data) => {
  pop.changeProfileData(data);
  loadDataCards().then((data) => {
    for (let i = 0; i < data.length; i++) {

            cardsContainer.append(createCard(data[i]));
    }
  
})

.catch((err) => {
    console.log(err);
});
})
.catch((err) => {
  console.log(err);
});

const popupFormPerson = popupContainPerson.querySelector('.popup__form');
// Загрузка карточек на страницу

// Открытие / Закрытие popup
const buttonEditCard = profile.querySelector('.profile__add');

const overlaies = content.querySelectorAll('.popup');

// Элемент popup avatar

const buttonOpenPopupAvatar = profileProfileInfo.querySelector('.profile__avatar_edit');
const popupFormAvatar = popupAvatarContainer.querySelector('.popup__form_avatar');
// открытие popup avatar
buttonOpenPopupAvatar.addEventListener('click',function () {pop.resetImage(popupFormAvatar,validObj); pop.openPopup(popupAvatar)})
popupFormAvatar.addEventListener('submit',addNewAvatar);
//Добавление Карточки 

buttonEditCard.addEventListener('click', function () { pop.resetImage(popupFormCard,validObj); pop.openPopup(popupAddImage) });
buttonEdit.addEventListener('click', function () { pop.resetProfile(validObj); pop.openPopup(popupPerson) });

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => pop.closePopup(popup));
});
overlaies.forEach((overlay) => {
  overlay.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      pop.closePopup(overlay);
    }
  });
})

function handlePopupProfile(evt) {
  evt.preventDefault();
  pop.renderLoading(true,evt.target.querySelector('.popup__button'));
  saveOnServUser(popupNameInput,popupPostInput).then((res) => {
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
  pop.renderLoading(false,evt.target.querySelector('.popup__button'));
    pop.closePopup(popupPerson);
  });;
}

popupFormPerson.addEventListener('submit', handlePopupProfile);

popupFormCard.addEventListener('submit', addNewCard);

function addNewCard(evt) {
  evt.preventDefault();
  pop.renderLoading(true,evt.target.querySelector('.popup__button'));
  saveOnServCard(popupLinkInput, popupTitleInput).then ((data)=> {
    cardsContainer.prepend(createCard(data));
})
.catch((err) => {
    console.log(err);
})

.finally(()=> {
  pop.renderLoading(false,evt.target.querySelector('.popup__button'));
  pop.closePopup(popupAddImage);
}); 
  
}

function addNewAvatar(evt) {
  evt.preventDefault();
pop.renderLoading(true,evt.target.querySelector('.popup__button'));
  saveOnServAvatar(popupAvatarLink.value,imgAvatar).catch((err) => {
    console.log(err);
})
.finally(()=> {
    pop.renderLoading(false,evt.target.querySelector('.popup__button'));
    pop.closePopup(popupAvatar);
});

}

enableValidation(validObj); 

export { content, popupPicture, popupAddImage, 
  popupFormCard, popupPerson,  
  popupNameInput, popupPostInput, profileName, 
  profilePost, popupImg, popupCaption, 
  popupTitleInput,popupLinkInput, profileAvatar,popupAvatar,
  popupAvatarLink,imgAvatar,userId};

