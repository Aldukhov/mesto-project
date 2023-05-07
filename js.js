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
let popupInputs = popupContainer.querySelectorAll('.popup__input');
let profileName = profileInform.querySelector('.profile__name');
let profilePost = profileProfileInfo.querySelector('.profile__post');

// Открытие / Закрытие popup
const closeButton = popupContainer.querySelector('.popup__icon');
const editButton = profileInform.querySelector('.profile__edit');


function openAndClose(pop, number, popInput) {

  if (number === 1) {
    popInput[0].value = profileName.textContent;
    popInput[1].value = profilePost.textContent;
  } else if (number === 2) {
    popInput[0].value = '';
    popInput[1].value = '';
  }
  return pop.classList.toggle('popup_opened');

}

editButton.addEventListener('click', () => openAndClose(popupFirst, 1, popupInputs));
closeButton.addEventListener('click', () => openAndClose(popupFirst, 1, popupInputs));

//Редактирование имени и информации

const formElement = popupContainer.querySelector('.popup__form');

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputs[0].value;
  profilePost.textContent = popupInputs[1].value;

  openAndClose(popupFirst, 1, popupInputs);
}

formElement.addEventListener('submit', handleFormSubmit);

//Открытие Фото-popup 

const popupPicture = content.querySelector('.popup_picture');
const popupPicContainer = popupPicture.querySelector('.popup__container_picture');
let popupImg = popupPicContainer.querySelector('.popup__img');
let popupCaption = popupPicContainer.querySelector('.popup__caption');
const closeButtonPicture = popupPicContainer.querySelector('.popup__icon');

closeButtonPicture.addEventListener('click', () => openAndClose(popupPicture, 3));

function openPicture(card) {

  card.querySelector('.elements__img').addEventListener('click', function (evt) {

    popupImg.setAttribute('src', evt.target.getAttribute('src'));
  
    popupImg.setAttribute('alt',evt.target.nextElementSibling.textContent);

    popupCaption.textContent = evt.target.getAttribute('alt');
    openAndClose(popupPicture, 3)
  });
};


// Загрузка карточек на страницу

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardsContainer = document.querySelector('.elements'); // создание контейнера

function cardLoad() { //функция загузки карточек на страницу

  for (let i = 0; i < initialCards.length; i++) {

    const cardTemplate = document.querySelector('#card-template').content; // создание template
    const card = cardTemplate.querySelector('.elements__card').cloneNode(true); // клонирование элемента
    card.querySelector('.elements__img').setAttribute('src', initialCards[i].link);
    card.querySelector('.elements__img').setAttribute('alt', initialCards[i].name);
    card.querySelector('.elements__name').textContent = initialCards[i].name;
    deleteCard(card);
    like(card);
    openPicture(card);

    cardsContainer.append(card);
  }
}

cardLoad();

function like(card) {  // лайк
  card.querySelector('.elements__like').addEventListener('click', function (evt) { // добавление лайка
    const evtTarget = evt.target;
    evtTarget.classList.toggle('elements__like_active');
  })
}

//Удаление карточки 
function deleteCard(card) {

  card.querySelector('.elements__trash').addEventListener('click', function (evt) {
    const listItem = evt.target.closest('.elements__card');
    listItem.remove();
  });
}

//Форма добавления карточки

//Главный узел для popup
const popupSecond = content.querySelector('.popup_add');
const popupCardContain = popupSecond.querySelector('.popup__container_add');

// Открытие / Закрытие popup
const closeButtonCard = popupCardContain.querySelector('.popup__icon');
const editButtonCard = profile.querySelector('.profile__add');

editButtonCard.addEventListener('click', () => openAndClose(popupSecond, 2, popupCardInputs));
closeButtonCard.addEventListener('click', () => openAndClose(popupSecond, 2, popupCardInputs));


//Добавление Карточки 

//Элемент popup input
let popupCardInputs = popupCardContain.querySelectorAll('.popup__input');
let popupFormCard = popupCardContain.querySelector('.popup__cards');

function addNewCard(evt) {

  evt.preventDefault();
  const cardTemplate = document.querySelector('#card-template').content; // создание template
  const card = cardTemplate.querySelector('.elements__card').cloneNode(true); // клонирование элемента
  card.querySelector('.elements__img').setAttribute('src', popupCardInputs[1].value);
  card.querySelector('.elements__img').setAttribute('alt', popupCardInputs[0].value);
  card.querySelector('.elements__name').textContent = popupCardInputs[0].value;
  deleteCard(card);
  like(card);
  openPicture(card);
  cardsContainer.prepend(card);

  openAndClose(popupSecond, 2, popupCardInputs);
}


popupFormCard.addEventListener('submit', addNewCard);




