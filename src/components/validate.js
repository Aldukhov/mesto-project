import { content } from "../index.js";
const toggleButtonState = (inputList, buttonElement) => {

    if (hasInvalidInput(inputList)) {
      // buttonElement.setAttribute('disabled');
      buttonElement.disabled = true;
      buttonElement.classList.add('popup__button_inactive');
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove('popup__button_inactive');
    }
  }
  
  const setEventListeners = (formElement) => {
  
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    if (inputList.length === 0) {
      return
    }
  
    const button = formElement.querySelector('.popup__button');
  
    toggleButtonState(inputList, button);
  
    inputList.forEach((input) => {
      input.addEventListener('input', function () {
        checkInputValidity(formElement, input);
        toggleButtonState(inputList, button);
      })
    })
  }
  
  
  
  const showInputError = (formElement, input, errorMessage) => {
    const errorElement = formElement.querySelector(`.${input.id}-error`);
    input.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
  };
  
  const hideInputError = (formElement, input) => {
    input.valid = true;
    const errorElement = formElement.querySelector(`.${input.id}-error`);
    input.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
  
  }
  
  const checkInputValidity = (formElement, input) => {
    if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage);
    } else {
      input.setCustomValidity('');
    }
  
    if (!input.validity.valid) {
      showInputError(formElement, input, input.validationMessage);
    } else {
      hideInputError(formElement, input);
    }
  };
  const enableValidation = () => {  //Создаем массив из форм
    const formList = Array.from(content.querySelectorAll('.popup'));
    formList.forEach((element) => {
      element.addEventListener('submit', (evt) => {
        evt.preventDefault();
      })
  
      setEventListeners(element);
    })
  }
  const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
      return !input.validity.valid;
    })
  }
  
  export {hideInputError,enableValidation};