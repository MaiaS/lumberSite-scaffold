export const linearScale = (current, minO, maxO, minN, maxN) => {
  if (maxO === minO) return 0;
  const newNum = ((current - minO) * (maxN - minN)) / (maxO - minO) + minN;
  return newNum;
};
