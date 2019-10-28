import http from '../http';

export function getMoviesList() {
  return http('/4/news/latest', undefined, { method: 'GET' }).then(response => response.json());
}
