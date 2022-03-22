export const throttle = (func, time) => {
  let wait = false;

  return (...args) => {
    if (!wait) {
      func.apply(this, args);

      wait = true;

      setTimeout(() => {
        wait = false;
      }, time);
    }
  };
};
