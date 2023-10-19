import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._bigImg = this._popup.querySelector('.popup__img');
        this._caption = this._popup.querySelector('.popup__caption')
    }
    open(name, link) {
        super.open();
        this._bigImg.src = link;
        this._bigImg.alt = name;
        this._caption.textContent = name;
    }
}