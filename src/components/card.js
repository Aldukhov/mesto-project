import { openPicture } from "./modal.js";
import { api } from "./utils";
import { userId } from "./index.js";

export default class Card {
  constructor (picture, selectorCard) {
    this._link = picture.link;
    this._name = picture.name;
    this._id = picture._id;
    this._selector = selectorCard;
    this._likes = picture.likes;
    this._ownerId = picture.owner._id;
  }
  _getElement () {
    const cardTemplate = document
    .querySelector(selectorCard)
    .content
    .querySelector('.elements__card')
    .cloneNode(true);

    return cardTemplate;
  }

  createCard() {
    this._card = this._getElement();
    const imgCard = this._card.querySelector('.elements__img');
    imgCard.src = this._link;
    imgCard.alt = this._name;
    imgCard.id = this._id;
    this._card.querySelector('.elements__name').textContent = this._name;
    this._checkAuthor(this._card);
    this._checkLike(this._card);
    this._deleteCard(this._card, this._id);
    this._like(this._card);
    this._setEventListeners(imgCard, this._card);
    return this._card;
  }

  // вынести id в константу
  _checkAuthor(card) {
    if (this._ownerId === '22c6d0525cf8eec9fa356c3d') {
      card.querySelector('.elements__trash').classList.add('elements__trash_active');
    };
  }

  _checkLike(card) {
    if (this._likes.length > 0) {
      this._likeQant(this._likes, card);
      if (this._likes.some(element => element._id === userId.id)) {
        card.querySelector('.elements__like').classList.add('elements__like_active');
      }
    };
  }

  _deleteCard(card, id) {
    card.querySelector('.elements__trash').addEventListener('click', function (evt) {
      const listItem = evt.target.closest('.elements__card');
      api.deleteCard(id).then((data) => {
        listItem.remove();
      })
        .catch((err) => {
          console.log(err);
        })
    });
  }

  _like(card) {
    card.querySelector('.elements__like').addEventListener('click', function (evt) {
      const evtTarget = evt.target;
      if (evtTarget.classList.contains('elements__like_active')) {
        api.deleteLike(this._id).then((data) => {
          evtTarget.classList.remove('elements__like_active');
          this._likeQant(data.likes, card);
        })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api.addLike(this._id).then((data) => {
          this._likeQant(data.likes, card);
          evtTarget.classList.add('elements__like_active');
        })
          .catch((err) => {
            console.log(err);
          });
      }
    })
  }

  _setEventListeners (element, card) {
    element.addEventListener('click', function (evt) {
      openPicture(card);
    });
  }

  _likeQant(likeQantity, card) {
    if (likeQantity.length === undefined) {
      card.querySelector('.elements__like-qantity').textContent = 0;
    } else {
      card.querySelector('.elements__like-qantity').textContent = likeQantity.length;
    }
    if (likeQantity.length > 0) {
      card.querySelector('.elements__like-qantity').classList.add('elements__like-qantity_active');
    } else if ((likeQantity.length <= 0) && card.querySelector('.elements__like-qantity').classList.contains('elements__like-qantity_active')) {
      card.querySelector('.elements__like-qantity').classList.remove('elements__like-qantity_active');
    }
  }

}