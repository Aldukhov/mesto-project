import "../pages/index.css";
import * as pop from './modal.js';
import { cardLoad } from "./card";
import { enableValidation } from "./validate";
import { loadDataCards, loadDataUser } from "./API";

const validObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
// Выбор верхних узлов проекта. 
const page = document.querySelector('.page');
const content = page.querySelector('.content');


//Главный узел для profile
const profile = content.querySelector('.profile');
const profileProfileInfo = profile.querySelector('.profile__profile-info');
const profileInform = profileProfileInfo.querySelector('.profile__inform');

//loadDataUser();

//Главный узел для popup
const popupPerson = content.querySelector('.popup_edit');
const popupContainPerson = popupPerson.querySelector('.popup__container_edit');

//Элементы popup input и profile
const popupNameInput = popupContainPerson.querySelector('#popup_name');
const popupPostInput = popupContainPerson.querySelector('#popup_post');
const profileName = profileInform.querySelector('.profile__name');
const profilePost = profileProfileInfo.querySelector('.profile__post');

// Открытие / Закрытие popup
const editButton = profileInform.querySelector('.profile__edit');
// находим все крестики проекта по универсальному селектор
const closeButtons = content.querySelectorAll('.popup__icon');
const profileAvatar = content.querySelector('.profile__avatar');   
//Редактирование имени и информации

const popupFormPerson = popupContainPerson.querySelector('.popup__form');
// Загрузка карточек на страницу

//Открытие Фото-popup 

const popupPicture = content.querySelector('.popup_picture');
const popupPicContainer = popupPicture.querySelector('.popup__container_picture');
const popupImg = popupPicContainer.querySelector('.popup__img');
const popupCaption = popupPicContainer.querySelector('.popup__caption');

//Форма добавления карточки

//Главный узел для popup
const popupAddImage = content.querySelector('.popup_add');
const popupCardContain = popupAddImage.querySelector('.popup__container_add');

// Открытие / Закрытие popup
const editButtonCard = profile.querySelector('.profile__add');

const overlaies = content.querySelectorAll('.popup');


//Добавление Карточки 

//Элемент popup input
const popupTitleInput = popupCardContain.querySelector('#popup_title');
const popupLinkInput = popupCardContain.querySelector('#popup_link');
const popupFormCard = popupCardContain.querySelector('.popup__form_cards');


const arkhyz = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
const chelyabinsk = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', import.meta.url);
const ivanovo = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', import.meta.url);
const kamchatka = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', import.meta.url);
const kholmogorsky = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', import.meta.url);
const baikal = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', import.meta.url);

const initialCards = [
  {
    name: 'Архыз',
    link: arkhyz
  },
  {
    name: 'Челябинская область',
    link: chelyabinsk
  },
  {
    name: 'Иваново',
    link: ivanovo
  },
  {
    name: 'Камчатка',
    link: kamchatka
  },
  {
    name: 'Холмогорский район',
    link: kholmogorsky
  },
  {
    name: 'Байкал',
    link: baikal
  }
];


editButtonCard.addEventListener('click', function () { pop.resetImage(validObj); pop.openPopup(popupAddImage) });
editButton.addEventListener('click', function () { pop.resetProfile(validObj); pop.openPopup(popupPerson) });

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

popupFormPerson.addEventListener('submit', pop.handlePopupProfile);

popupFormCard.addEventListener('submit', pop.addNewCard);

cardLoad();

//loadDataCards();


enableValidation(validObj); 

export { content, popupPicture, popupAddImage, 
  popupFormCard, popupPerson,  
  popupNameInput, popupPostInput, profileName, 
  profilePost, popupImg, popupCaption, 
  popupTitleInput,initialCards, popupLinkInput, profileAvatar};

  //