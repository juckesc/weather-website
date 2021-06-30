console.log('Client side JavaScript file is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const success = document.querySelector('#success');
const failure = document.querySelector('#failure');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;

  success.textContent = 'Loading...'
  failure.textContent = '';

  const url = `http://localhost:3000/weather?address=${location}`;

  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        success.textContent = ''
        failure.textContent = data.error;
      } else {
        success.textContent = `The weather for ${data.location} is ${data.forecastData.forecast}!`;
      };
    });
  });
  
});