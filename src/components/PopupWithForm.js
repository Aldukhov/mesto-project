import Popup from "./POPUP";

export default class PopupWithForm extends Popup {
    constructor (methodApi, popupSelector) {
        super(popupSelector);
        this._method = methodApi;
        this._form = this._popup.querySelector('.popup__form');
        this._inputArr = this._popup.querySelector('popup__input');
        this._button = this._popup.querySelector('.popup__button');
    }
    _getInputValues() {
        this._inputValuesList = {};
        this._inputArr.forEach((input) => {
            this._inputValuesList[input.name] = input.value;
        });
        return this._inputValuesList;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._renderLoading(true);
            this._method(this._getInputValues())
            .then(() => this.close())
            .finally(() => {
            this._renderLoading(false);
            });
        })
    }

    _renderLoading(isLoading) {
        if(isLoading) {
            this._button.textContent = 'Сохранение..';
          } else {
            this._button.textContent = 'Сохранить';
          }
    }

    close() {
        super.close();
        this._form.reset();
    }
}