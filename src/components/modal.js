import {
  popupNameInput, popupPerson,
  popupPostInput, profileName, profilePost,
  popupImg, popupCaption,popupPicture, popupAddImage,popupAvatar,popupAvatarLink,imgAvatar,popupLinkInput, popupTitleInput
} from './index.js';
import { resetValidity } from './validate.js';
import { cardsContainer,createCard } from './card.js';
import { saveOnServUser,saveOnServCard,saveOnServAvatar} from './API.js';

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}
/////////////////////////////////////////////
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}
//////////////////////////////////////
function resetProfile(validObj) {
  popupNameInput.value = profileName.textContent;
  popupPostInput.value = profilePost.textContent;
  resetValidity(popupPerson, validObj);
}

function closePopupEsc(evt) {
  const popup = document.querySelector('.popup_opened');
  if ((evt.key === 'Escape')) {
    closePopup(popup);
  }
}

function resetImage(popupForm,validObj) {
  popupForm.reset();
  resetValidity(popupForm, validObj);

}


function handlePopupProfile(evt) {
  evt.preventDefault();
  renderLoading(true,evt.target.querySelector('.popup__button'));
  profileName.textContent = popupNameInput.value;
  profilePost.textContent = popupPostInput.value;
  saveOnServUser(profileName,profilePost,evt,popupPerson,renderLoading,closePopup);
}


function openPicture(card) {

  card.querySelector('.elements__img').addEventListener('click', function (evt) {

    popupImg.setAttribute('src', evt.target.getAttribute('src'));

    popupImg.setAttribute('alt', evt.target.nextElementSibling.textContent);

    popupCaption.textContent = evt.target.getAttribute('alt');
    openPopup(popupPicture);
  });
};

function renderLoading(isLoading,button) {
  if(isLoading) {
    button.textContent = 'Сохранение..';
  } else {
    button.textContent = 'Сохранить';
  }
}

function addNewCard(evt) {
  evt.preventDefault();
  renderLoading(true,evt.target.querySelector('.popup__button'));
  saveOnServCard(popupLinkInput, popupTitleInput,cardsContainer,evt,popupAddImage,renderLoading,closePopup,createCard); 
  
}

function addNewAvatar(evt) {
  evt.preventDefault();
renderLoading(true,evt.target.querySelector('.popup__button'));
  saveOnServAvatar(popupAvatarLink.value,imgAvatar,evt,popupAddImage,renderLoading,closePopup);
  closePopup(popupAvatar);
}

export { openPicture, addNewCard, handlePopupProfile, resetImage, resetValidity, resetProfile, openPopup, closePopup,addNewAvatar };