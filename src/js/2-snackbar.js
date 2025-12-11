import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const formElem = document.querySelector('.form');
formElem.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(formElem);
  const formValues = Object.fromEntries(formData.entries());
  const delay = Number(formValues.delay);
  const makePromise = ({ delay, radioValue }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (radioValue === 'fulfilled') {
          resolve('fulfilled');
        } else {
          reject('rejected');
        }
      }, delay);
    });
  };
  makePromise({
    delay,
    radioValue: formValues.state,
  })
    .then(() => {
      iziToast.show({
        message: `Fulfilled promise in ${delay}ms`,
        messageColor: 'white',
        messageSize: '20',
        backgroundColor: 'green',
        position: 'topCenter',
        timeout: 2000,
      });
    })
    .catch(() => {
      iziToast.show({
        message: `Rejected promise in ${delay}ms`,
        messageColor: 'white',
        messageSize: '20',
        backgroundColor: 'red',
        position: 'topCenter',
        timeout: 2000,
      });
    });
  formElem.reset();
});
