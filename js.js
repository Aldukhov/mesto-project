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
const closeButton = popupContainer.querySelector('.popup__icon');
const editButton = profileInform.querySelector('.profile__edit');
////////////////////////////////////////////////
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
/////////////////////////////////////////////
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
//////////////////////////////////////
function resetProfile() {
  popupNameInput.value = profileName.textContent;
  popupPostInput.value = profilePost.textContent;
}

function resetImage() {
  popupFormCard.reset();
}

editButton.addEventListener('click', function () { resetProfile(); openPopup(popupFirst) });

// находим все крестики проекта по универсальному селектору
const closeButtons = content.querySelectorAll('.popup__icon');

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});




//Редактирование имени и информации

const formElement = popupContainer.querySelector('.popup__form');

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupNameInput.value;
  profilePost.textContent = popupPostInput.value;

  closePopup(popupFirst);
}

formElement.addEventListener('submit', handleFormSubmit);

//Открытие Фото-popup 

const popupPicture = content.querySelector('.popup_picture');
const popupPicContainer = popupPicture.querySelector('.popup__container_picture');
const popupImg = popupPicContainer.querySelector('.popup__img');
const popupCaption = popupPicContainer.querySelector('.popup__caption');
const closeButtonPicture = popupPicContainer.querySelector('.popup__icon');


function openPicture(card) {

  card.querySelector('.elements__img').addEventListener('click', function (evt) {

    popupImg.setAttribute('src', evt.target.getAttribute('src'));

    popupImg.setAttribute('alt', evt.target.nextElementSibling.textContent);

    popupCaption.textContent = evt.target.getAttribute('alt');
    openPopup(popupPicture);
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

function createCard(title, input) {
  const cardTemplate = document.querySelector('#card-template').content; // создание template
  const card = cardTemplate.querySelector('.elements__card').cloneNode(true); // клонирование элемента
  card.querySelector('.elements__img').setAttribute('src', title);
  card.querySelector('.elements__img').setAttribute('alt', input);
  card.querySelector('.elements__name').textContent = input;
  deleteCard(card);
  like(card);
  openPicture(card);

  return card;
}

function cardLoad() { //функция загузки карточек на страницу

  for (let i = 0; i < initialCards.length; i++) {

    cardsContainer.append(createCard(initialCards[i].link, initialCards[i].name));
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

editButtonCard.addEventListener('click', function () { resetImage(); openPopup(popupSecond) });


//Добавление Карточки 

//Элемент popup input
const popupTitleInput = popupCardContain.querySelector('#popup_title');
const popupLinkInput = popupCardContain.querySelector('#popup_link');
const popupFormCard = popupCardContain.querySelector('.popup__cards');


function addNewCard(evt) {

  evt.preventDefault();
  cardsContainer.prepend(createCard(popupTitleInput.value, popupLinkInput.value));
  closePopup(popupSecond);
}


popupFormCard.addEventListener('submit', addNewCard);




