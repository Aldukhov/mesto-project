
import {
  popupNameInput, popupPerson, popupFormCard,
  popupPostInput, profileName, profilePost,
  popupImg, popupCaption,
  popupTitleInput,
  popupLinkInput, popupPicture, popupAddImage 
} from './index.js';
import { resetValidity } from './validate.js';
import { createCard, cardsContainer } from './card.js';
import { saveOnServUser,saveOnServCard } from './API.js';

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

function resetImage(validObj) {
  popupFormCard.reset();
  resetValidity(popupFormCard, validObj);

}


function handlePopupProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupNameInput.value;
  profilePost.textContent = popupPostInput.value;
  //saveOnServUser();
  closePopup(popupPerson);
}


function openPicture(card) {

  card.querySelector('.elements__img').addEventListener('click', function (evt) {

    popupImg.setAttribute('src', evt.target.getAttribute('src'));

    popupImg.setAttribute('alt', evt.target.nextElementSibling.textContent);

    popupCaption.textContent = evt.target.getAttribute('alt');
    openPopup(popupPicture);
  });
};


function addNewCard(evt) {

  evt.preventDefault();
  cardsContainer.prepend(createCard(popupLinkInput.value
    , popupTitleInput.value,0,'22c6d0525cf8eec9fa356c3d'));
 //  saveOnServCard();
  closePopup(popupAddImage);
}

export { openPicture, addNewCard, handlePopupProfile, resetImage, resetValidity, resetProfile, openPopup, closePopup };