export const getRandomColor = (opacity) => {
  const call = (limit) => Math.max(limit, Math.floor(Math.random() * 225));
  const r = call(50);
  const g = call(100);
  const b = call(200);
  return `rgba(${r},${g},${b}, ${opacity})`;
};
