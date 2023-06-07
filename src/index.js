import { container } from "webpack";
import "./pages/index.css";
import * as pop from './components/popup.js';
import { cardLoad } from "./components/card";
import { enableValidation } from "./components/validate";

// Выбор верхних узлов проекта. 
const page = document.querySelector('.page');
const content = page.querySelector('.content');


//Главный узел для profile
const profile = content.querySelector('.profile');
const profileProfileInfo = profile.querySelector('.profile__profile-info');
const profileInform = profileProfileInfo.querySelector('.profile__inform');


//Главный узел для popup
const popupFirst = content.querySelector('.popup_edit');
const popupContainer = popupFirst.querySelector('.popup__container_edit');

//Элементы popup input и profile
const popupNameInput = popupContainer.querySelector('#popup_name');
const popupPostInput = popupContainer.querySelector('#popup_post');
const profileName = profileInform.querySelector('.profile__name');
const profilePost = profileProfileInfo.querySelector('.profile__post');

// Открытие / Закрытие popup
const editButton = profileInform.querySelector('.profile__edit');
// находим все крестики проекта по универсальному селектор
const closeButtons = content.querySelectorAll('.popup__icon');

//Редактирование имени и информации
  
const formElement = popupContainer.querySelector('.popup__form');
// Загрузка карточек на страницу

//Открытие Фото-popup 

const popupPicture = content.querySelector('.popup_picture');
const popupPicContainer = popupPicture.querySelector('.popup__container_picture');
const popupImg = popupPicContainer.querySelector('.popup__img');
const popupCaption = popupPicContainer.querySelector('.popup__caption');

//Форма добавления карточки

//Главный узел для popup
const popupSecond = content.querySelector('.popup_add');
const popupCardContain = popupSecond.querySelector('.popup__container_add');

// Открытие / Закрытие popup
const editButtonCard = profile.querySelector('.profile__add');

const overlaies = content.querySelectorAll('.popup');


//Добавление Карточки 

//Элемент popup input
const popupTitleInput = popupCardContain.querySelector('#popup_title');
const popupLinkInput = popupCardContain.querySelector('#popup_link');
const popupFormCard = popupCardContain.querySelector('.popup__cards');

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

editButtonCard.addEventListener('click', function () { pop.resetImage(); pop.openPopup(popupSecond) });
editButton.addEventListener('click', function () { pop.resetProfile(); pop.openPopup(popupFirst) });

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => pop.closePopup(popup));
});
overlaies.forEach((overlay) => {

  window.addEventListener('keydown', (evt) => {
     if ((evt.key === 'Escape') && overlay.classList.contains('popup_opened')) {
      pop.closePopup(overlay);
      }
    
  });

  overlay.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup'))
     {
      pop.closePopup(overlay);
    } 
  });
})

formElement.addEventListener('submit', pop.handleFormSubmit);

popupFormCard.addEventListener('submit', pop.addNewCard); 

cardLoad();
enableValidation();
export {content,popupPicture,popupSecond,popupFormCard,popupFirst,initialCards,popupNameInput,popupPostInput,profileName,profilePost,popupImg,popupCaption,popupTitleInput,popupLinkInput,};
