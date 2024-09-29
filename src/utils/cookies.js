export function setCookie (value, days) {
  let day = new Date();
  day.setTime(day.getTime() + 24 * 60 * 60 * 1000 * days);
  document.cookie = `${value}=true;path=/;expires=${day.toGMTString()}`;
}

export function getCookie (key) {
  let value = document.cookie.match(`(^|;) ?${key}=([^;]*)(;|$)`);
  return value ? value[2] : null;
}

export function deleteCookie (value) {
  document.cookie = `${value}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}