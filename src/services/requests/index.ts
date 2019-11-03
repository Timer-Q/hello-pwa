import http from '../http';

function getStemp() {
  return +new Date();
}

export async function getList() {
  const response = await http(`/async/getLatestUpdate?dt=${getStemp()}`, undefined, {
    method: 'GET',
  });
  return await response.json();
}

export async function getDetail(id: number) {
  const response = await http(`/async/animeinfo?ai=${id}&dt=${getStemp()}`, undefined, {
    method: 'GET',
  });
  return await response.json();
}
