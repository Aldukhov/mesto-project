import {
  popupNameInput, popupPerson,
  popupPostInput, profileName, profilePost,
  popupImg, popupCaption,popupPicture, 
 profileAvatar,userId
} from './index.js';
import { resetValidity } from './validate.js';

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
  
  if ((evt.key === 'Escape')) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function resetImage(popupForm,validObj) {
  popupForm.reset();
  resetValidity(popupForm, validObj);

}


function changeProfileData(data) {
  profileName.textContent = data.name;
  profilePost.textContent = data.about;
  profileAvatar.src = data.avatar;
  userId.id = data._id;
}


function openPicture(evt) {

    popupImg.setAttribute('src', evt.target.getAttribute('src'));

    popupImg.setAttribute('alt', evt.target.nextElementSibling.textContent);

    popupCaption.textContent = evt.target.getAttribute('alt');
    openPopup(popupPicture);
};

function renderLoading(isLoading,button) {
  if(isLoading) {
    button.textContent = 'Сохранение..';
  } else {
    button.textContent = 'Сохранить';
  }
}


export {changeProfileData,openPicture,
  resetImage, resetValidity, resetProfile, 
  openPopup, closePopup,renderLoading };