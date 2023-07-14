export default class Popup {
    constructor (popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if ((evt.key === 'Escape')) {
            this.close();
          }
    }

    setEventListeners() {
        const buttonClose = this._popup.querySelector('.popup__icon');
        buttonClose.addEventListener('click', ()=> {
            this.close();
        });
        const overlays = document.querySelectorAll('.popup')
        overlays.forEach((overlay) => {
            overlay.addEventListener('mousedown', (evt) => {
                if (evt.target.classList.contains('popup_opened')) {
                    this.close()
                }
            })
        });
        document.addEventListener('keydown', this._handleEscClose);
}
}