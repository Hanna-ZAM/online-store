import { checkCorrectInput, confirm } from './function';

export function createModalWindow() {
  let correctName = false;
  let correctPhone = false;
  let correctAdress = false;
  let correctEmail = false;
  let correctCard = false;
  let correctCVV = false;
  let correctDate = false;
  const arrCorrect: Array<boolean> = [];
  const arrNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const background = createElement('', 'div', 'back');
  const modalWindow = createElement('', 'div', 'modal-window');
  const personal = createElement('Personal detail', 'p', 'modal__title');
  const inputName = createElement('', 'input', 'input');
  inputName.setAttribute('type', 'text');
  inputName.setAttribute('id', 'name_input');
  inputName.setAttribute('placeholder', 'Name');
  inputName.addEventListener('input', () => {
    correctName = checkCorrectInput(inputName as HTMLInputElement, 2, 3);
    console.log('correctName ' + correctName);
    arrCorrect[0] = correctName;
    return correctName;
  });
  const inputPhone = createElement('', 'input', 'input');
  inputPhone.setAttribute('type', 'tel');
  inputPhone.setAttribute('id', 'tel_input');
  inputPhone.setAttribute('placeholder', 'Phone: +375290000000');
  inputPhone.addEventListener('input', () => {
    (inputPhone as HTMLInputElement).value = `+${(inputPhone as HTMLInputElement).value
      .split('')
      .slice(1)
      .filter((el) => arrNum.includes(Number(el)))
      .join('')}`;
    correctPhone = checkCorrectInput(inputPhone as HTMLInputElement, 1, 10, '+');
    console.log('correctPhone ' + correctPhone);
    arrCorrect[1] = correctPhone;
    return correctPhone;
  });

  const inputAdress = createElement('', 'input', 'input');
  inputAdress.setAttribute('type', 'text');
  inputAdress.setAttribute('id', 'adress_input');
  inputAdress.setAttribute('placeholder', 'Adress');
  inputAdress.addEventListener('input', () => {
    correctAdress = checkCorrectInput(inputAdress as HTMLInputElement, 3, 5);
    console.log('correctAdress ' + correctAdress);
    arrCorrect[2] = correctAdress;
    return correctAdress;
  });

  const inputEmail = createElement('', 'input', 'input');
  inputEmail.setAttribute('type', 'email');
  inputEmail.setAttribute('id', 'email_input');
  inputEmail.setAttribute('placeholder', 'Email');
  inputEmail.addEventListener('input', () => {
    const value = (inputEmail as HTMLInputElement).value.split('@');
    correctEmail = value.length === 2 && value[1].split('.').length > 1;
    console.log('correctEmail ' + correctEmail);
    arrCorrect[3] = correctEmail;
    return correctEmail;
  });

  modalWindow.appendChild(personal);
  modalWindow.appendChild(inputName);
  modalWindow.appendChild(inputPhone);
  modalWindow.appendChild(inputAdress);
  modalWindow.appendChild(inputEmail);

  const flexContainerCard = createElement('', 'div', 'flex-container');
  flexContainerCard.classList.add('flex-container__card');
  const inputImg = createElement('', 'img', 'input__img');
  inputImg.setAttribute('alt', 'type of card');
  inputImg.setAttribute('src', '../img/card.svg');
  const card = createElement('Card detail', 'p', 'modal__title');
  modalWindow.appendChild(card);
  const inputCard = createElement('', 'input', 'input');
  inputCard.setAttribute('id', 'card_input');
  inputCard.setAttribute('type', 'text');
  inputCard.setAttribute('placeholder', 'Number card');

  inputCard.addEventListener('input', () => {
    if ((inputCard as HTMLInputElement).value.split('')[0] === '5') {
      (inputImg as HTMLImageElement).src = '../img/mastercard.svg';
    } else if ((inputCard as HTMLInputElement).value.split('')[0] === '4') {
      (inputImg as HTMLImageElement).src = '../img/visa.svg';
    } else if ((inputCard as HTMLInputElement).value.split('')[0] === '2') {
      (inputImg as HTMLImageElement).src = '../img/mir.png';
    } else {
      (inputImg as HTMLImageElement).src = '../img/card.svg';
    }
    (inputCard as HTMLInputElement).value = (inputCard as HTMLInputElement).value
      .split('')
      .filter((el) => arrNum.includes(Number(el)))
      .join('');
    if ((inputCard as HTMLInputElement).value.length > 16) {
      (inputCard as HTMLInputElement).value = (inputCard as HTMLInputElement).value.substr(0, 16);
    }
    correctCard = (inputCard as HTMLInputElement).value.length === 16;
    console.log('correctCard ' + correctCard);
    arrCorrect[4] = correctCard;
    return correctCard;
  });
  const flexContainerCardSmall = createElement('', 'div', 'flex-container');
  flexContainerCardSmall.classList.add('flex-container__small');

  const inputCvv = createElement('', 'input', 'input-small');
  inputCvv.setAttribute('id', 'CVV_input');
  inputCvv.setAttribute('type', 'number');
  inputCvv.setAttribute('placeholder', 'CVV');
  inputCvv.addEventListener('input', () => {
    let value = (inputCvv as HTMLInputElement).value;
    if (value.length > 3) {
      (inputCvv as HTMLInputElement).value = (inputCvv as HTMLInputElement).value.substr(0, 3);
    }
    value = (inputCvv as HTMLInputElement).value;
    correctCVV = value.length === 3;
    console.log('correctCVV ' + correctCVV);
    arrCorrect[5] = correctCVV;
    return correctCVV;
  });
  const inputDate = createElement('', 'input', 'input-small');
  inputDate.setAttribute('id', 'date_input');
  inputDate.setAttribute('type', 'text');
  inputDate.setAttribute('placeholder', 'Date');
  inputDate.addEventListener('input', () => {
    (inputDate as HTMLInputElement).value = (inputDate as HTMLInputElement).value
      .split('')
      .filter((el) => arrNum.includes(Number(el)))
      .join('');
    if ((inputDate as HTMLInputElement).value.length > 2) {
      if (Number((inputDate as HTMLInputElement).value.slice(0, 2)) > 12) {
        (inputDate as HTMLInputElement).value = '12';
      } else if (Number((inputDate as HTMLInputElement).value.slice(0, 2)) < 1) {
        (inputDate as HTMLInputElement).value = '01';
      }
      if ((inputDate as HTMLInputElement).value.length > 4) {
        (inputDate as HTMLInputElement).value = (inputDate as HTMLInputElement).value.substr(0, 4);
      }
      (inputDate as HTMLInputElement).value = `${(inputDate as HTMLInputElement).value.slice(
        0,
        2
      )}/${(inputDate as HTMLInputElement).value.slice(2, 4)}`;
    }
    correctDate = (inputDate as HTMLInputElement).value.length === 5;
    arrCorrect[6] = correctDate;
    return correctDate;
  });

  flexContainerCard.appendChild(inputCard);
  flexContainerCardSmall.appendChild(inputImg);
  flexContainerCardSmall.appendChild(inputCvv);
  flexContainerCardSmall.appendChild(inputDate);
  flexContainerCard.appendChild(flexContainerCardSmall);
  modalWindow.appendChild(flexContainerCard);
  const buttonModal = createElement('Confirm', 'button', 'button');
  buttonModal.classList.add('modal-button');
  buttonModal.addEventListener('click', () => {
    confirm(arrCorrect, modalWindow);
    if (confirm(arrCorrect, modalWindow)) {
      setTimeout(function () {
        const header = document.querySelector('.header');
        header?.removeChild(background);
      }, 5000);
    }
  });

  modalWindow.appendChild(buttonModal);
  background.appendChild(modalWindow);
  return background;
}

function createElement(text: string, type: string, style: string) {
  const element = document.createElement(type);
  element.classList.add(style);
  element.innerText = text;
  return element;
}
