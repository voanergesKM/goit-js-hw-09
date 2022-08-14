import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onSubmitBtnClick);
formEl.addEventListener('input', onInputChange);

let timerId = null;
let intervalId = null;
let totalAmount = null;
let passedTime = null;
let data = {};

function onInputChange(e) {
  data[e.target.name] = Number(e.target.value);
}

function onSubmitBtnClick(e) {
  e.preventDefault();

  let dataStart = Date.now();

  timerId = setTimeout(() => {
    totalAmount += 1;
    passedTime = Date.now() - dataStart;
    createPromise();
    clearTimeout(timerId);

    intervalId = setInterval(() => {
      totalAmount += 1;
      if (totalAmount >= data.amount) {
        clearInterval(intervalId);
      }

      passedTime = Date.now() - dataStart;

      createPromise();
    }, data.step);
  }, data.delay);

  e.currentTarget.reset();
}

function createPromise(position, delay) {
  console.log('createPromise : delay', delay);
  console.log(data);
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    notiFySucces();
  } else {
    notiFyFailure();
  }
}

function notiFySucces() {
  Notify.success(`Fullfilled promise ${totalAmount} in ${passedTime} ms`);
}

function notiFyFailure() {
  Notify.failure(`Rejected promise ${totalAmount} in ${passedTime} ms`);
}
