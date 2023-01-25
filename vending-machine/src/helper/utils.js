export async function fetchData(url, { method, bodyData } = {}) {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify(bodyData);
  const fetchParams = { method, headers, body };
  try {
    const data = await fetch(url, fetchParams);
    return data.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

export function getWonTemplate(number) {
  return `${number.toLocaleString()}원`;
}

export function delay(time) {
  return new Promise(res => setTimeout(() => res(), time));
}

export const debounce = (callback, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
};
