import Popup from "./POPUP";

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
    }
    open(name, link) {
        super.open();
        const bigImg = this._popup.querySelector('.popup__img');
        bigImg.src = link;
        bigImg.alt = name;
        this._popup.querySelector('.popup__caption').textContent = name;
    }
}