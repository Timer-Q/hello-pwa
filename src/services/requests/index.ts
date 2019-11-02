import http from '../http';

export async function getList() {
  // return http('/4/news/latest', undefined, { method: 'GET' }).then(response => response.json());
  const response = await http('/async/getLatestUpdate?dt=1572451854678', undefined, {
    method: 'GET',
  });
  return await response.json();
}

export async function getDetail() {
  const response = await http('/async/animeinfo?ai=381172&dt=1572452111083', undefined, {
    method: 'GET',
  });
  return await response.json();
}
