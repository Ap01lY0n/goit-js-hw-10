import { fetchBreeds, fetchCatByBreed } from './cat-api';
const elements = {
  selectForm: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};
console.log(elements.error.classList.value === 'error');
console.log(!elements.error.classList.value === 'error');
fetchBreeds().then(arr => {
  return addcats(arr);
});
function addcats(arr) {
  const markup = arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');

  elements.selectForm.insertAdjacentHTML('beforeend', markup);
  elements.selectForm.classList.toggle('change-status');
  elements.loader.classList.toggle('change-status');
}
elements.selectForm.addEventListener('change', e);

function e(evt) {
  evt.preventDefault();
  elements.loader.classList.toggle('change-status');
  elements.catInfo.classList.toggle('change-status');
  const breedId = evt.target.value;

  if (elements.error.classList.value !== 'error') {
    elements.error.classList.add('error');
    elements.catInfo.classList.toggle('change-status');
  }
  fetchCatByBreed(breedId)
    .then(arr => {
      createM(arr);
      function createM() {
        elements.catInfo.innerHTML = '';

        const el = `
      <div class="wrap"> 
       <img class="pic" src="${arr[0].url}" alt="${arr[0].breeds[0].name}" width='300'>
       <div class="wrapper">
        <p class="breed-cat">${arr[0].breeds[0].name}</p>
        <p class="descr">${arr[0].breeds[0].description}</p>
        <p class="temperament"><span class="span-text">temperament:</span>${arr[0].breeds[0].temperament}</p>
       </div>
       </div>
      `;
        elements.loader.classList.toggle('change-status');
        elements.catInfo.classList.toggle('change-status');
        elements.catInfo.insertAdjacentHTML('beforeend', el);
      }
    })
    .catch(data => {
      elements.loader.classList.toggle('change-status');
      elements.error.classList.toggle('error');
      console.log('3', data);
    });
}