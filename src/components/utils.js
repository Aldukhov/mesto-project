import  UserInfo  from "./UserInfo";
import  Api  from "./API copy";
import PopupWithForm from "./PopupWithForm";

let userId = {};

const profileId = '22c6d0525cf8eec9fa356c3d';


//Главный узел для profile
const profileAvatar = '.profile__avatar';  
const profileName = '.profile__name';
const profilePost = '.profile__post';

const profileInfo = new UserInfo (profileName,profilePost,profileAvatar); 

const api = new Api ({baseUrl:'https://nomoreparties.co/v1/plus-cohort-25', headers:{
  authorization: 'fe25609f-c231-4126-8459-9808870edc8e',
  'Content-Type': 'application/json'
}});

const popupPerson = '.popup_edit';
const popupAvatar = '.popup_avatar';
const popupAddCard = '.popup_add';
const popupPicture = '.popup_picture';
const popupEditProfile = new PopupWithForm(popupPerson,api.saveUser);
const formAvatar = '.popup__form_avatar';
const formNewCard = '.popup__form_cards';

const buttonAvatar = document.querySelector('.profile__avatar_edit');
const buttonAddCard = document.querySelector('.profile__add');

export {profileInfo,api,popupEditProfile, popupAvatar, popupAddCard, popupPicture, buttonAvatar, buttonAddCard, formAvatar, formNewCard, profileAvatar, profileName, profilePost };
