import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputEl: document.querySelector('[datetime-picker]'),
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

let currentDate = Date.now();
let dateInFuture = null;
let intervalId = null;
let delta = null;

refs.startBtn.setAttribute('disabled', '');

refs.startBtn.addEventListener('click', onStartBtnClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateInFuture = selectedDates[0];
    if (currentDate > selectedDates[0]) {
      Notify.failure('Please choose a date in the future', {
        position: 'center-top',
        cssAnimationStyle: 'zoom',
      });

      refs.startBtn.setAttribute('disabled', '');
      return;
    } else {
      refs.startBtn.removeAttribute('disabled');

      Notify.success('Back to the future!', {
        position: 'center-top',
      });
    }
  },
};

flatpickr('#datetime-picker', options);

function onStartBtnClick() {
  intervalId = setInterval(() => {
    delta = dateInFuture - new Date();
    makeMarkUpTimer(convertMs(delta));
    if (Number(delta) <= 1000) {
      clearInterval(intervalId);
    }
  }, 1000);
}

function makeMarkUpTimer({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = addLeadingZero(days);
  refs.hoursEl.textContent = addLeadingZero(hours);
  refs.minutesEl.textContent = addLeadingZero(minutes);
  refs.secondsEl.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
