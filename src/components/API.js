export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;

    }

    getData(endOflink) {
        return fetch(`${this._baseUrl}/${endOflink}`, {
            headers: this._headers
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Oops: ${res.status}`);
        })
    }

    _getResponseData(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
      }

    saveUser(popupNameInput, popupPostInput) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: popupNameInput,
                about: popupPostInput
            })
        }).then(this._getResponseData)
    }

    saveCard(popupLinkInput, popupTitleInput) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                name: popupTitleInput,
                link: popupLinkInput
            })
        }).then(this._getResponseData)
    }

    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            headers: this._headers,
            method: 'PUT',
        }).then(this._getResponseData)
    }

    deleteLike(cardId) {
        return  fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
    }) .then(this._getResponseData)
    }

    saveAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        }) .then(this._getResponseData)
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        }) .then(this._getResponseData)
    }
}