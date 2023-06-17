import "../pages/index.css";
import * as pop from './modal.js';
import { cardsContainer,createCard } from "./card";
import { enableValidation } from "./validate";
import { loadDataCards, loadDataUser,saveOnServUser,saveOnServCard } from "./API";

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
loadDataUser(pop.changeProfileData,cardsContainer,createCard,loadDataCards);

const popupFormPerson = popupContainPerson.querySelector('.popup__form');
// Загрузка карточек на страницу

// Открытие / Закрытие popup
const ButtonEditCard = profile.querySelector('.profile__add');

const overlaies = content.querySelectorAll('.popup');

// Элемент popup avatar

const buttonOpenPopupAvatar = profileProfileInfo.querySelector('.profile__avatar_edit');
const popupFormAvatar = popupAvatarContainer.querySelector('.popup__form_avatar');
// открытие popup avatar
buttonOpenPopupAvatar.addEventListener('click',function () {pop.resetImage(popupFormAvatar,validObj); pop.openPopup(popupAvatar)})
popupFormAvatar.addEventListener('submit',addNewAvatar);
//Добавление Карточки 

ButtonEditCard.addEventListener('click', function () { pop.resetImage(popupFormCard,validObj); pop.openPopup(popupAddImage) });
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
  saveOnServUser(popupNameInput,popupPostInput,profileName,profilePost,evt,popupPerson,pop.renderLoading,pop.closePopup);
}

popupFormPerson.addEventListener('submit', handlePopupProfile);

popupFormCard.addEventListener('submit', addNewCard);

function addNewCard(evt) {
  evt.preventDefault();
  pop.renderLoading(true,evt.target.querySelector('.popup__button'));
  saveOnServCard(popupLinkInput, popupTitleInput,cardsContainer,evt,popupAddImage,createCard); 
  
}

function addNewAvatar(evt) {
  evt.preventDefault();
pop.renderLoading(true,evt.target.querySelector('.popup__button'));
  saveOnServAvatar(popupAvatarLink.value,imgAvatar,evt,popupAddImage);
  closePopup(popupAvatar);
}

enableValidation(validObj); 

export { content, popupPicture, popupAddImage, 
  popupFormCard, popupPerson,  
  popupNameInput, popupPostInput, profileName, 
  profilePost, popupImg, popupCaption, 
  popupTitleInput,popupLinkInput, profileAvatar,popupAvatar,
  popupAvatarLink,imgAvatar,userId};

