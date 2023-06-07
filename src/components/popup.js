
import {popupNameInput,popupFirst,popupFormCard,
  popupPostInput,profileName,profilePost,
  popupImg,popupCaption,
  popupTitleInput,
  popupLinkInput, popupPicture,popupSecond} from '../index.js';
import { hideInputError } from './validate.js';
import { createCard } from './card.js';
const cardsContainer = document.querySelector('.elements'); // создание контейнера

function closePopup(popup) {
    popup.classList.remove('popup_opened');
  }
  /////////////////////////////////////////////
  function openPopup(popup) {
    popup.classList.add('popup_opened');
  }
  //////////////////////////////////////
  function resetProfile() {
    popupNameInput.value = profileName.textContent;
    popupPostInput.value = profilePost.textContent;
    resetValidity(popupFirst);
  }
  
  function resetValidity(popup) {
  
    const inputList = Array.from(popup.querySelectorAll('.popup__input'));
  
    inputList.forEach((input) => {
  
      hideInputError(popup, input);
  
    })
  
  }
  
  function resetImage() {
    popupFormCard.reset();
    resetValidity(popupFormCard);
  
  }

  
  function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = popupNameInput.value;
    profilePost.textContent = popupPostInput.value;
  
    closePopup(popupFirst);
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
  cardsContainer.prepend(createCard(popupTitleInput.value, popupLinkInput.value));
  closePopup(popupSecond);
}


export {openPicture,addNewCard,handleFormSubmit,resetImage,resetValidity,resetProfile,openPopup,closePopup};

