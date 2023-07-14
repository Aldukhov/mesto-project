import  Api  from "../components/API copy";

//Главный узел для profile
const profileAvatar = '.profile__avatar';  
const profileName = '.profile__name';
const profilePost = '.profile__post';

const api = new Api ({baseUrl:'https://nomoreparties.co/v1/plus-cohort-25', headers:{
  authorization: 'fe25609f-c231-4126-8459-9808870edc8e',
  'Content-Type': 'application/json'
}});

const popupPerson = '.popup_edit';
const popupAvatar = '.popup_avatar';
const popupAddCard = '.popup_add';
const popupPicture = '.popup_picture';
const formAvatar = '.popup__form_avatar';
const formNewCard = '.popup__form_cards';
const formProfile = '.popup__form_profile';
const templateSelector = '#card-template';
const cardListSelector = '.elements';

const buttonAvatar = document.querySelector('.profile__avatar_edit');
const buttonAddCard = document.querySelector('.profile__add');
const buttonEdit = document.querySelector('.profile__edit');

export {api, popupAvatar, cardListSelector, popupAddCard, templateSelector, formProfile, popupPicture, buttonEdit, popupPerson, buttonAvatar, buttonAddCard, formAvatar, formNewCard, profileAvatar, profileName, profilePost };
