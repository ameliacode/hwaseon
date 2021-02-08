import axios from 'axios';

const ID_KEY = '0AyAyRj8YChF_BiC3iia';
const SECRET_KEY = 'G8eq5Uax1T';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'X-Naver-Client-Id': ID_KEY,
    'X-Naver-Client-Secret': SECRET_KEY,
    'Access-Control-Allow-Origin': '*'
  }
});

export const naverMoviesApi = {
  search: word => api.get('/v1/search/movie.json', {
    params: {
      query: word,
      display: 20
    }
  })
};