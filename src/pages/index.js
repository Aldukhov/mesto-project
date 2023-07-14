import "./index.css";
import { popupPerson, popupAvatar, cardListSelector, popupAddCard, templateSelector,
  buttonEdit, popupPicture, formProfile, buttonAvatar, buttonAddCard,
  formAvatar, formNewCard, profileAvatar, profileName, profilePost
} from "../utils/utils";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import FormValidator from "../components/FormValidator";
import UserInfo from "../components/UserInfo";
import Section from '../components/Section';
import Card from "../components/card";
import Api from "../components/API";

const api = new Api ({baseUrl:'https://nomoreparties.co/v1/plus-cohort-25', headers:{
  authorization: 'fe25609f-c231-4126-8459-9808870edc8e',
  'Content-Type': 'application/json'
}});

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

// удаление карточки
function deleteCard (card, id) {
    const listItem = evt.target.closest('.elements__card');
    api.deleteCard(id).then((data) => {
      listItem.remove();
    })
      .catch((err) => {
        console.log(err);
      })
  };

// добавление новой карточки
const cardList = new Section({
  renderer: (item) => {
    const card = new Card(item, templateSelector, userInfo.id, {
      handleCardClick: (name, link) => {
        popupImage.open(name, link);
      }},
      {handleCardLike: (evt, card, id, likeQant) => {
        likeCard(evt, card, id, likeQant);
      }},
      {handleCardDelete: (card, id) => {
      deleteCard(card, id)
      }
    });
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
  }
}, cardListSelector);

//отрисовка массива карточек и информации профиля
Promise.all([api.getData('users/me'), api.getData('cards')])
  .then(([user, cardsArray]) => {
    userInfo.setUserInfo(user);
    cardList.renderItems(cardsArray);
  })
  .catch((err) => {
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


//лайк карточки
function likeCard (evt, card, id, likeQant) {
    if (evt.target.classList.contains('elements__like_active')) {
      api.deleteLike(id).then((data) => {
        this._evtTarget.classList.remove('elements__like_active');
        likeQant(data.likes, card);
      })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api.addLike(id).then((data) => {
        evt.target.classList.add('elements__like_active');
        likeQant(data.likes, card);
      })
        .catch((err) => {
          console.log(err);
        });
    }
  }

// класс попап редактирования аватара
const popupEditAvatar = new PopupWithForm(popupAvatar,
  {
    handleFormSubmit: (formData) => {
      api.saveAvatar(formData.link)
        .then((data) => { 
          userInfo.setUserInfo(data);
          popupEditAvatar.close() 
        })
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
        cardList.renderItems([data],'prepend'); 
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












