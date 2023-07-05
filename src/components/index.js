import "../pages/index.css";
import { api, profileInfo,popupEditProfile } from "./utils";

const validObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};



// Открытие / Закрытие popup
const buttonEdit = document.querySelector('.profile__edit');



api.getData('users/me').then((data) => {
  profileInfo.setUserInfo(data);

})
  .catch((err) => {
    console.log(err);
  });

  buttonEdit.addEventListener('click', function () { popupEditProfile.open(),api.saveUser});
  popupEditProfile.setEventListeners();










  






