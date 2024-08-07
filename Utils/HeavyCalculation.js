export const Calculate = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  let x = 1;
  for (let i = 0; i < 1000000; i++) {
    x = x + 1;
    x = x - 1;
    x = x * 1;
    x = x / 1;
  }
  return x;
};
