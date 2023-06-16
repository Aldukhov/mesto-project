import { openPicture } from "./modal.js";
import { addLike,deleteLike,deleteCardAPI } from "./API.js";

const cardsContainer = document.querySelector('.elements'); // создание контейнера

function createCard(picture) {
  const cardTemplate = document.querySelector('#card-template').content; // создание template
  const card = cardTemplate.querySelector('.elements__card').cloneNode(true); // клонирование элемента
  card.querySelector('.elements__img').setAttribute('src', picture.link);
  card.querySelector('.elements__img').setAttribute('alt', picture.name);
  card.querySelector('.elements__img').setAttribute('id',picture._id)
  card.querySelector('.elements__name').textContent = picture.name;

  
  if(picture.likes.length>0) {
    likeQant(picture.likes,card);

   if(picture.likes.some(element => element._id === '22c6d0525cf8eec9fa356c3d'))
   {
    card.querySelector('.elements__like').classList.add('elements__like_active');
   }
  }

  if(picture.owner._id === '22c6d0525cf8eec9fa356c3d') {
    card.querySelector('.elements__trash').classList.add('elements__trash_active');
  }

  deleteCard(card,picture._id);
  like(card,picture);
  openPicture(card);

  return card;
}


function likeQant ( likeQantity,card) {
  card.querySelector('.elements__like-qantity').textContent = likeQantity.length;
  if(likeQantity.length > 0) {
    card.querySelector('.elements__like-qantity').classList.add('elements__like-qantity_active');
  } else if((likeQantity.length <= 0) && card.querySelector('.elements__like-qantity').classList.contains('elements__like-qantity_active')){
    card.querySelector('.elements__like-qantity').classList.remove('elements__like-qantity_active');
  }
}


function like(card,picture) {  // лайк
  card.querySelector('.elements__like').addEventListener('click', function (evt) {
   
    const evtTarget = evt.target;
    if(evtTarget.classList.contains('elements__like_active')){
       deleteLike(picture._id,card,likeQant);
       evtTarget.classList.remove('elements__like_active');

    } else {
      addLike(picture._id,card,likeQant);
    evtTarget.classList.add('elements__like_active');
    
    }

  })
}

//Удаление карточки 
function deleteCard(card,id) {

  card.querySelector('.elements__trash').addEventListener('click', function (evt) {
    
    const listItem = evt.target.closest('.elements__card');
    deleteCardAPI(id,listItem);
  });
}

export {createCard,cardsContainer,likeQant};