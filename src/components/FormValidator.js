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
    
    _hasInvalidInput() {
        return this._inputList.some((input) => {
          return !input.validity.valid;
        })
      }

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            
        })
      
        this._setEventListeners();
    }
    _checkInputValidity(input) {
        if (input.validity.patternMismatch) {
          input.setCustomValidity(input.dataset.errorMessage);
        } else {
          input.setCustomValidity('');
        }
      
        if (!input.validity.valid) {
          this._showInputError(input, input.validationMessage);
        } else {
          this._hideInputError(input);
        }
      };

    _setEventListeners() {

        if (this._inputList.length === 0) {
            return
        }

        this._toggleButtonState();

        this._inputList.forEach((input) => {
            input.addEventListener('input',  () => {
              this._checkInputValidity(input);
              this._toggleButtonState();
            })
        })
    }

    _toggleButtonState() {

        if (this._hasInvalidInput()) {
            this._buttonElement.disabled = true;
            this._buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            this._buttonElement.disabled = false;
            this._buttonElement.classList.remove(this._inactiveButtonClass);
        }
    }

    

     _showInputError (input, errorMessage) {
        this._errorElement = this._form.querySelector(`.${input.id}-error`);
        input.classList.add(this._inputErrorClass);
        this._errorElement.textContent = errorMessage;
        this._errorElement.classList.add(this._errorClass);
      };
      
     _hideInputError(input){
        input.valid = true;
        this._errorElement = this._form.querySelector(`.${input.id}-error`);
        input.classList.remove(this._inputErrorClass);
        this._errorElement.classList.remove(this._errorClass);
        this._errorElement.textContent = '';
      
      }

      resetValidity() {
        this._toggleButtonState();
    this._inputList.forEach((input) => {
  
      this._hideInputError(input);
  
    })
      }

      
}