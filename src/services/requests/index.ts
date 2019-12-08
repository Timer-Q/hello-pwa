import http from '../http';

export async function getList(query: any) {
  const qs = new URLSearchParams(query).toString();
  const response = await http(`https://service-9cmks4hz-1256472744.ap-beijing.apigateway.myqcloud.com/release/fetchData?${qs}`, undefined, {
    method: 'GET',
  });
  return await response.json();
}

export async function getDetail(query: any) {
  const qs = new URLSearchParams(query).toString();
  const response = await http(`https://service-ceagg0pb-1256472744.ap-beijing.apigateway.myqcloud.com/release/fetchDetail?${qs}`, undefined, {
    method: 'GET',
  });
  return await response.json();
}
