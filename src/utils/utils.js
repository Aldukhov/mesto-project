//Главный узел для profile
const profileAvatar = '.profile__avatar';  
const profileName = '.profile__name';
const profilePost = '.profile__post';

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

export {popupAvatar, cardListSelector, popupAddCard, templateSelector, formProfile, popupPicture, buttonEdit, popupPerson, buttonAvatar, buttonAddCard, formAvatar, formNewCard, profileAvatar, profileName, profilePost };
