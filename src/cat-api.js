import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_B4yGLXYDwebECKHyQoHLiNZEIXWUCwSza12oLkJePzdvBGq6juFCKPQFt01Mx563';
function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log('1', err.response);
    });
}
function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(res => {
      return res.data;
    })
    .catch(err => console.log('2', err.response));
}
export { fetchBreeds, fetchCatByBreed };