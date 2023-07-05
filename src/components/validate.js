

const toggleButtonState = (inputList, buttonElement,obj) => {

    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(obj.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(obj.inactiveButtonClass);
    }
  }
    
  function resetValidity(popup,obj) {
    
    const inputList = Array.from(popup.querySelectorAll(obj.inputSelector));
    toggleButtonState(inputList,popup.querySelector(obj.submitButtonSelector),obj);
    inputList.forEach((input) => {
  
      hideInputError(popup, input,obj);
  
    })
  
  }

  const setEventListeners = (formElement,obj) => {
  
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    if (inputList.length === 0) {
      return
    }
  
    const button = formElement.querySelector(obj.submitButtonSelector);
  
    toggleButtonState(inputList, button,obj);
  
    inputList.forEach((input) => {
      input.addEventListener('input', function () {
        checkInputValidity(formElement, input,obj);
        toggleButtonState(inputList, button,obj);
      })
    })
  }
  
  
  
  const showInputError = (formElement, input, errorMessage,obj) => {
    const errorElement = formElement.querySelector(`.${input.id}-error`);
    input.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.errorClass);
  };
  
  const hideInputError = (formElement, input,obj) => {
    input.valid = true;
    const errorElement = formElement.querySelector(`.${input.id}-error`);
    input.classList.remove(obj.inputErrorClass);
    errorElement.classList.remove(obj.errorClass);
    errorElement.textContent = '';
  
  }
  
  const checkInputValidity = (formElement, input,obj) => {
    if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage);
    } else {
      input.setCustomValidity('');
    }
  
    if (!input.validity.valid) {
      showInputError(formElement, input, input.validationMessage,obj);
    } else {
      hideInputError(formElement, input,obj);
    }
  };
  const enableValidation = (obj) => {  //Создаем массив из форм
    const formList = Array.from(content.querySelectorAll(obj.formSelector));
    formList.forEach((element) => {
      element.addEventListener('submit', (evt) => {
        evt.preventDefault();
      })
  
      setEventListeners(element,obj);
    })
  }
  const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
      return !input.validity.valid;
    })
  }
  
  export {hideInputError,enableValidation,resetValidity};

