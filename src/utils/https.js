import $http from 'axios';

export async function callAPI (url, data) {
  const _data = {
    params : data
  }
  const ret = await $http(url, _data);

  return ret.data;
}

export function setMeta (data) {
  document.title = data.title;
}