import "../pages/index.css";
import * as pop from './modal.js';
import { cardsContainer,createCard } from "./card";
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
loadDataUser(profileName,profilePost,profileAvatar);
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

// Элемент popup avatar

const popupAvatar = content.querySelector('.popup_avatar');
const popupAvatarContainer = popupAvatar.querySelector('.popup__container_avatar');
const popupAvatarLink = popupAvatarContainer.querySelector('#popup_link');
const editButtonAvatar = profileProfileInfo.querySelector('.profile__avatar_edit');
const popupFormAvatar = popupAvatarContainer.querySelector('.popup__form_avatar');
const imgAvatar = profileProfileInfo.querySelector('.profile__avatar');
// открытие popup avatar
editButtonAvatar.addEventListener('click',function () {pop.resetImage(popupFormAvatar,validObj); pop.openPopup(popupAvatar)})
popupFormAvatar.addEventListener('submit', pop.addNewAvatar);
//Добавление Карточки 

//Элемент popup input
const popupTitleInput = popupCardContain.querySelector('#popup_title');
const popupLinkInput = popupCardContain.querySelector('#popup_link');
const popupFormCard = popupCardContain.querySelector('.popup__form_cards');

editButtonCard.addEventListener('click', function () { pop.resetImage(popupFormCard,validObj); pop.openPopup(popupAddImage) });
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


loadDataCards(cardsContainer,createCard);


enableValidation(validObj); 

export { content, popupPicture, popupAddImage, 
  popupFormCard, popupPerson,  
  popupNameInput, popupPostInput, profileName, 
  profilePost, popupImg, popupCaption, 
  popupTitleInput,popupLinkInput, profileAvatar,popupAvatar,popupAvatarLink,imgAvatar};

