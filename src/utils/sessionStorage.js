export function isStored(date) {
  const data = JSON.parse(sessionStorage.getItem(date));
  return data == null ? false : data;
}

export function setSessionStorage(date, times) {
  try {
    sessionStorage.setItem(date, JSON.stringify(times));
  } catch (error) {
    console.error(error);
  }
}
