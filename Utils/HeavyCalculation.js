export const Calculate = () => {
  let x = 1;
  for (let i = 0; i < 1000000; i++) {
    x = x + 1;
    x = x - 1;
    x = x * 1;
    x = x / 1;
  }
  return x;
};
