const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let randomHexColor = null;
let intervalId = null;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

refs.stopBtn.setAttribute('disabled', '');

function onStartBtnClick() {
  refs.stopBtn.removeAttribute('disabled');
  refs.startBtn.setAttribute('disabled', '');

  intervalId = setInterval(() => changeBodyBgColor(), 1000);
}

function onStopBtnClick() {
  refs.startBtn.removeAttribute('disabled');
  refs.stopBtn.setAttribute('disabled', '');

  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyBgColor() {
  randomHexColor = getRandomHexColor();

  refs.body.style.backgroundColor = randomHexColor;
}
