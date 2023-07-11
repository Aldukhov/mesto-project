import Popup from "./Popup";
import { userInfo } from "./index.js";

export default class PopupWithForm extends Popup {
    constructor (popupSelector, {handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputArr = this._popup.querySelectorAll('.popup__input');
        this._button = this._popup.querySelector('.popup__button');
    }
    _getInputValues() {
        this._inputValuesList = {};
        Array.from(this._inputArr).forEach((input) => {
            this._inputValuesList[input.name] = input.value;
        });
        return this._inputValuesList;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.renderLoading(true);
            this._handleFormSubmit(this._getInputValues());
            
        })
    }

    resetData() {

        Array.from(this._inputArr).forEach((input) => {
                        if(input.name === "name") {
                input.value = userInfo.getUserInfo().name;
            }
             else if (input.name === "post") {
                input.value = userInfo.getUserInfo().post;
            }
        });
    }

    renderLoading(isLoading) {
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