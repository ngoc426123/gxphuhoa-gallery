export function getLocalstorage(key) {
  return JSON.parse(window.localStorage.getItem(key) || null);
}

export function setLocalstorage(key, value) {
  return window.localStorage.setItem(key, JSON.stringify(value));
}
