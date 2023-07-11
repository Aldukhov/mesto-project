import "../pages/index.css";
import {
  api, popupPerson, popupAvatar, cardListSelector, popupAddCard, templateSelector,
  buttonEdit, popupPicture, formProfile, buttonAvatar, buttonAddCard,
  formAvatar, formNewCard, profileAvatar, profileName, profilePost
} from "./utils";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";
import FormValidator from "./FormValidator";
import UserInfo from "./UserInfo";
import Section from './Section';
import Card from "./card";

const validObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// Класс профиля
const userInfo = new UserInfo(profileName, profilePost, profileAvatar);

// Валидация
const formValidatorAvatar = new FormValidator(validObj, formAvatar);
formValidatorAvatar.enableValidation();
const formValidatorAddCard = new FormValidator(validObj, formNewCard);
formValidatorAddCard.enableValidation();
const formValidatorProfile = new FormValidator(validObj, formProfile);
formValidatorProfile.enableValidation();


api.getData('users/me').then((data) => {
  userInfo.setUserInfo(data);
})
  .catch((err) => {
    console.log(err);
  });

// добавление новой карточки
const cardList = new Section({
  renderer: (item) => {
    const card = new Card(item, templateSelector);
    const cardElement = card.createCard();
    cardList.addItem(cardElement, append);
  }
}, cardListSelector);

// отрисовка массива карточек
api.getData('cards').then((data) => {
  cardList.renderItems(data);
}).catch((err) => {
  console.log(err);
});

// попап редактирования профиля
const popupEditProfile = new PopupWithForm(popupPerson, {
  handleFormSubmit: (formData) => {
    api.saveUser(formData.name, formData.post)
      .then((data) => { userInfo.setUserInfo(data); popupEditProfile.close() })
      .catch((err) => { console.log(err) })
      .finally(() => {
        popupEditProfile.renderLoading(false);
      });
  }
});
popupEditProfile.setEventListeners();
buttonEdit.addEventListener('click', function () { popupEditProfile.resetData(), formValidatorProfile.resetValidity(), popupEditProfile.open(); });


// класс попап редактирования аватара
const popupEditAvatar = new PopupWithForm(popupAvatar,
  {
    handleFormSubmit: (formData) => {
      api.saveAvatar(formData.link, userInfo.getUserInfo().avatar)
        .then((data) => { popupEditAvatar.close() })
        .catch((err) => { console.log(err) })
        .finally(() => {
          popupEditAvatar.renderLoading(false);
        });
    }
  });
popupEditAvatar.setEventListeners();
buttonAvatar.addEventListener('click', () => {
  popupEditAvatar.open();
  formValidatorAvatar.resetValidity();
})



// класс попап добавление новой карточки
const popupNewCardAdd = new PopupWithForm(popupAddCard, {
  handleFormSubmit: (formData) => {
    api.saveCard(formData.link, formData.title)
      .then((data) => {
        cardList.renderItems(data); 
        popupNewCardAdd.close();
      })
      .catch((err) => { console.log(err) })
      .finally(() => {
        popupNewCardAdd.renderLoading(false);
      });
}
  });
popupNewCardAdd.setEventListeners();
buttonAddCard.addEventListener('click', () => {
  popupNewCardAdd.open();
  formValidatorAddCard.resetValidity();
})

// класс попап клик на карточку для увеличения изображения
const popupImage = new PopupWithImage(popupPicture);
popupImage.setEventListeners();



export { userInfo }












