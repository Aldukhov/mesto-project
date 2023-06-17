
let userId = [ ];
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


// находим все крестики проекта по универсальному селектор
const profileAvatar = content.querySelector('.profile__avatar');   
//Редактирование имени и информации
//Открытие Фото-popup 

const popupPicture = content.querySelector('.popup_picture');
const popupPicContainer = popupPicture.querySelector('.popup__container_picture');
const popupImg = popupPicContainer.querySelector('.popup__img');
const popupCaption = popupPicContainer.querySelector('.popup__caption');

//Форма добавления карточки

//Главный узел для popup
const popupAddImage = content.querySelector('.popup_add');
const popupCardContain = popupAddImage.querySelector('.popup__container_add');

// Элемент popup avatar

const popupAvatar = content.querySelector('.popup_avatar');
const popupAvatarContainer = popupAvatar.querySelector('.popup__container_avatar');
const popupAvatarLink = popupAvatarContainer.querySelector('#popup_link');
const imgAvatar = profileProfileInfo.querySelector('.profile__avatar');
//Элемент popup input
const popupTitleInput = popupCardContain.querySelector('#popup_title');
const popupLinkInput = popupCardContain.querySelector('#popup_link');
const popupFormCard = popupCardContain.querySelector('.popup__form_cards');



export { content, popupPicture, popupAddImage, 
  popupFormCard, popupPerson,  
  popupNameInput, popupPostInput, profileName, 
  profilePost, popupImg, popupCaption, 
  popupTitleInput,popupLinkInput, profileAvatar,popupAvatar,
  popupAvatarLink,imgAvatar,userId,
  profileInform,popupContainPerson,profile,profileProfileInfo,popupAvatarContainer};

