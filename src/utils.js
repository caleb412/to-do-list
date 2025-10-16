export function generateID() {
  const min = Math.ceil(0.95);
  const max = Math.floor(5000000.0);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
