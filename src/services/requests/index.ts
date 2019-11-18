import http from '../http';

function getStemp() {
  return +new Date();
}

export async function getList() {
  const response = await http('https://service-9cmks4hz-1256472744.ap-beijing.apigateway.myqcloud.com/release/fetchData', undefined, {
    method: 'GET',
  });
  return await response.json();
}

export async function getDetail(id: number) {
  const response = await http(`https://service-lv7uhhmt-1256472744.ap-beijing.apigateway.myqcloud.com/release/fetchDetail`, {
    ai: id
  });
  return await response.json();
}
