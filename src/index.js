import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const ul = document.querySelector('.country-list');
const div = document.querySelector('.country-info');

input.addEventListener(
  'keyup',
  debounce(evt => {
    evt.preventDefault();

    ul.innerHTML = '';
    div.innerHTML = '';

    const textInput = evt.target.value.trim();

    if (!textInput) {
      return;
    }

    fetchCountries(textInput).then(arr => {
      console.log(arr);

      if (arr.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (arr.length >= 2) {
        ul.insertAdjacentHTML('beforeend', makeList(arr));

        Object.assign(ul.style, {
          listStyle: 'none',
        });
      } else if (arr.length === 1) {
        div.innerHTML = makeCard(arr[0]);
      } else {
        Notify.failure('Oops, there is no country with that name');
      }
    });
  }, DEBOUNCE_DELAY)
);

function makeList(arr) {
  const list = arr
    .map(
      el =>
        `<li ><svg width='30' height ='30'><img src="${el.flags.svg}" width='30' height ='30' /></svg>${el.name.official}</li>`
    )
    .join('');

  return list;
}

function makeCard(country) {
  return `
    <h1>
        <svg width='30' height ='30'><img src="${
          country.flags.svg
        }" width='30' height ='30' /></svg>${country.name.official}
    </h1>
    <p><b>Capital:</b> ${country.capital}</p>
    <p><b>Population:</b> ${country.population}</p>
    <p><b>Languges:</b> ${Object.values(country.languages).join(', ')}</p>
    `;
}
