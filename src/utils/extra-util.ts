export function fakeDelay(seconds: number) {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve('');
    }, seconds * 1000);
  });
}
