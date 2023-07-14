import { api } from "../utils/utils.js";

export default class Card {
  constructor (picture, selectorCard, userId, {handleCardClick}, {handleCardLike}, {handleCardDelete}) {
    this._link = picture.link;
    this._name = picture.name;
    this._id = picture._id;
    this._selector = selectorCard;
    this._likes = picture.likes;
    this._ownerId = picture.owner._id;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;
  }
  _getElement () {
    this._cardTemplate = document.querySelector(this._selector)
    .content.querySelector('.elements__card').cloneNode(true);

    return this._cardTemplate;
  }

  createCard() {
    this._card = this._getElement();
    this._imgCard = this._card.querySelector('.elements__img');
    this._imgCard.src = this._link;
    this._imgCard.alt = this._name;
    this._imgCard.id = this._id;
    this._card.querySelector('.elements__name').textContent = this._name;
    this._checkAuthor(this._card);
    this._checkLike(this._card);
    this._setEventListeners(this._imgCard, this._card);
    return this._card;
  }

  _checkAuthor(card) {
    if (this._ownerId === this._userId) {
      card.querySelector('.elements__trash').classList.add('elements__trash_active');
    };
  }

  _checkLike(card) {
    if (this._likes.length > 0) {
      this._likeQant(this._likes, card);
      
      if (this._likes.some(element => element._id === this._userId)) {
        card.querySelector('.elements__like').classList.add('elements__like_active');
      }

    };
  }

  _setEventListeners(imgCard, card) {
    imgCard.addEventListener('click',() => {this._handleCardClick(this._name, this._link)});
    card.querySelector('.elements__like').addEventListener('click', () => {this._handleCardLike(evt, this._card, this._id, this._likeQant)});
    card.querySelector('.elements__trash').addEventListener('click', function (evt) {this._handleCardDelete(this._card, this._id)});
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