import Popup from "./POPUP";

export default class PopupWithImage extends Popup {
    constructor (data) {
        this._imgSrc = data.link;
        this._imgName = data.name;
    }
    open() {
        this._popup.classList.add('popup_opened');
        const bigImg = this._popup.querySelector('.popup__img');
        bigImg.src = this._imgSrc;
        bigImg.alt = this._imgName;
        this._popup.querySelector('.popup__caption').textContent = this._imgName;
    }
}