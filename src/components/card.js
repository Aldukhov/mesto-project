import { openPicture } from "./modal.js";
import { initialCards} from "./index.js";

const cardsContainer = document.querySelector('.elements'); // создание контейнера

function createCard(title, input,likeQantity,id) {
  const cardTemplate = document.querySelector('#card-template').content; // создание template
  const card = cardTemplate.querySelector('.elements__card').cloneNode(true); // клонирование элемента
  card.querySelector('.elements__img').setAttribute('src', title);
  card.querySelector('.elements__img').setAttribute('alt', input);
  card.querySelector('.elements__name').textContent = input;
/*
  if(likeQantity.length>0) {
  card.querySelector('.elements__like-qantity').textContent = likeQantity.length;
  card.querySelector('.elements__like-qantity').classList.add('elements__like-qantity_active');
  }

  if(id === '22c6d0525cf8eec9fa356c3d') {
    card.querySelector('.elements__trash').classList.add('elements__trash_active');
  }

  */
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

export {cardLoad,createCard,cardsContainer};