const seededRandom = function (seed) {
  var m = 2 ** 35 - 31;
  var a = 185852;
  var s = seed % m;
  return function () {
    return (s = (s * a) % m) / m;
  };
};

export const fetchAPI = function (date) {
  return new Promise((resolve) => {
    let result = [];
    let random = seededRandom(date.getDate());
    const start = new Date(`1970-01-01T10:00`);
    const end = new Date(`1970-01-01T22:00`);
    let current = start;

    while (current <= end) {
      const formattedTime = current.toTimeString().slice(0, 5);
      const available = random() > 0.5;
      result.push({ time: formattedTime, available });
      current.setMinutes(current.getMinutes() + 30);
    }

    const delay = Math.random() * (1000 - 200) + 200;
    setTimeout(() => {
      resolve(result);
    }, delay);
  });
};

export const submitAPI = function (formData) {
  return true;
};
