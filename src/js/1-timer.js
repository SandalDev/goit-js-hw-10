import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;
const refs = {
  startBtn: document.querySelector('button[data-start]'),
  inputDate: document.querySelector('#datetime-picker'),
  dataDays: document.querySelector('span[data-days]'),
  dataHours: document.querySelector('span[data-hours]'),
  dataMin: document.querySelector('span[data-minutes]'),
  dataSec: document.querySelector('span[data-seconds]'),
  options: {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] <= new Date()) {
        refs.startBtn.disabled = true;
        iziToast.show({
          message: 'Please choose a date in the future',
          messageColor: 'white',
          messageSize: '20',
          backgroundColor: 'red',
          position: 'center',
          timeout: 2000,
        });
      } else {
        refs.startBtn.disabled = false;
        userSelectedDate = selectedDates[0];
      }
    },
  },
};
document.addEventListener('DOMContentLoaded', () => {
  refs.startBtn.disabled = true;
});
flatpickr(refs.inputDate, refs.options);
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
refs.startBtn.addEventListener('click', () => {
  refs.startBtn.disabled = true;
  refs.inputDate.disabled = true;
  const intervalId = setInterval(() => {
    const diffMs = userSelectedDate - new Date();
    const { days, hours, minutes, seconds } = convertMs(diffMs);
    refs.dataDays.textContent = addLeadingZero(days);
    refs.dataHours.textContent = addLeadingZero(hours);
    refs.dataMin.textContent = addLeadingZero(minutes);
    refs.dataSec.textContent = addLeadingZero(seconds);
    if (diffMs < 1000) {
      clearInterval(intervalId);
      refs.inputDate.disabled = false;
      iziToast.show({
        message: 'Well Done!',
        messageColor: 'white',
        messageSize: '20',
        backgroundColor: 'green',
        position: 'center',
        timeout: 2000,
      });
    }
  }, 1000);
});
