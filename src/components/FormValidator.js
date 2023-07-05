export default class FormValidator {
    constructor({ inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        inputErrorClass,
        errorClass }, formSelector) {
        this._inputSelector = inputSelector;
        this._submitButtonSelector = submitButtonSelector;
        this._inactiveButtonClass = inactiveButtonClass;
        this._inputErrorClass = inputErrorClass;
        this._errorClass = errorClass;
        this._formSelector = formSelector;
        this._form = document.querySelector(this._formSelector);

        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));

        this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    }

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            _setEventListeners();
        })
    }

    _setEventListeners() {

        if (inputList.length === 0) {
            return
        }

        _toggleButtonState();

        this._inputList.forEach((input) => {
            input.addEventListener('input', function () {
                _checkInputValidity(input);
                _toggleButtonState();
            })
        })
    }

    _toggleButtonState() {

        if (_hasInvalidInput(this._inputList)) {
            this._buttonElement.disabled = true;
            this._buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            this._buttonElement.disabled = false;
            this._buttonElement.classList.remove(this._inactiveButtonClass);
        }
    }

    _checkInputValidity(input) {
        if (input.validity.patternMismatch) {
          input.setCustomValidity(input.dataset.errorMessage);
        } else {
          input.setCustomValidity('');
        }
      
        if (!input.validity.valid) {
          _showInputError(input, input.validationMessage);
        } else {
          _hideInputError(input);
        }
      };

     _showInputError (input, errorMessage) {
        this._errorElement = this._form.querySelector(`.${input.id}-error`);
        input.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
      };
      
     _hideInputError(input){
        input.valid = true;
        this._errorElement = this._form.querySelector(`.${input.id}-error`);
        input.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
      
      }

      resetValidity() {
        this._toggleButtonState();
    this._inputList.forEach((input) => {
  
      _hideInputError(input);
  
    })
      }

      _hasInvalidInput  () {
        return this._inputList.some((input) => {
          return !input.validity.valid;
        })
      }
}