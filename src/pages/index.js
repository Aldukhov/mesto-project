import "./index.css";
import { popupPerson, popupAvatar, cardListSelector, popupAddCard, templateSelector,
  buttonEdit, popupPicture, formProfile, buttonAvatar, buttonAddCard,
  formAvatar, formNewCard, profileAvatar, profileName, profilePost
} from "../utils/utils";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import FormValidator from "../components/FormValidator";
import UserInfo from "../components/UserInfo";
import Section from "../components/Section";
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
function deleteCard (card, id, cardCreated) {
    api.deleteCard(id).then((data) => {
      cardCreated.deleteCard(card);
    })
      .catch((err) => {
        console.log(err);
      })
  };

// создание новой карточки
function createNewCard (item) {
  const cardNew = new Card(item, templateSelector, userInfo.getUserInfo().id, {
    handleCardClick: (name, link) => {
      popupImage.open(name, link);
    }},
    {handleCardLike: (evt, card, id, likeQant) => {
      likeCard(evt, card, id, likeQant, cardNew);
    }},
    {handleCardDelete: (card, id) => {
    deleteCard(card, id, cardNew)
    }});
    const cardElement = cardNew.createCard();
    return cardElement;
}


function resetData(array) {
  Array.from(array).forEach((input) => {
                  if(input.name === "name") {
          input.value = userInfo.getUserInfo().name;
      }
       else if (input.name === "post") {
          input.value = userInfo.getUserInfo().post;
      }
  });
}

// добавление новой карточки
const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createNewCard(item));
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
//popupEditProfile.setEventListeners();
buttonEdit.addEventListener('click', function () {
  resetData(document.querySelector(popupPerson).querySelectorAll('.popup__input')); 
  formValidatorProfile.resetValidity();
  popupEditProfile.open(); });


//лайк карточки
function likeCard (evt, card, id, likeQant, cardCreated) {
    if (evt.target.classList.contains('elements__like_active')) {
      api.deleteLike(id).then((data) => {
        cardCreated.deleteLike(evt, likeQant, data.likes, card);
      })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api.addLike(id).then((data) => {
        cardCreated.addLike(evt, likeQant, data.likes, card);
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
//popupEditAvatar.setEventListeners();
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
//popupNewCardAdd.setEventListeners();
buttonAddCard.addEventListener('click', () => {
  popupNewCardAdd.open();
  formValidatorAddCard.resetValidity();
})

// класс попап клик на карточку для увеличения изображения
const popupImage = new PopupWithImage(popupPicture);
popupImage.setEventListeners();





