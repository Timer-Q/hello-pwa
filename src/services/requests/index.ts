import http from '../http';

export async function getList() {
  // return http('/4/news/latest', undefined, { method: 'GET' }).then(response => response.json());
  const response = await http('/timeline_v2_global', undefined, { method: 'GET' });
  return await response.json();
}
