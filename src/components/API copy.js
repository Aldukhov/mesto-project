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

    saveUser({popupNameInput, popupPostInput}) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: popupNameInput,
                about: popupPostInput
            })
        })
    }

    saveCard(popupLinkInput, popupTitleInput) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                name: popupTitleInput.value,
                link: popupLinkInput.value
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Oops: ${res.status}`);
        })
    }

    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            headers: this._headers,
            method: 'PUT',
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Oops: ${res.status}`);
        })
    }

    deleteLike(cardId) {
        return  fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
    }) .then((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Oops: ${res.status}`);
    })
    }

    saveAvatar(avatar,imgAvatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        }) .then((res) => {
            if (res.ok) {
                return imgAvatar.setAttribute('src',avatar);
            }
    
            return Promise.reject(`Oops: ${res.status}`);
        })
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        }) .then((res) => {
            if (res.ok) {
                return res.json();
            }
    
            return Promise.reject(`Oops: ${res.status}`);
        })
    }
}