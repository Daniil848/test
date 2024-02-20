export const percentVisiting = (
  arr: number[],
  number: number,
  averageGrade: number,
) => {
  const count = arr.reduce((acc, curr) => (curr === number ? acc + 1 : acc), 0);
  const percent = (count / arr.length) * 100;

  if (percent > 50 && averageGrade > 3) {
    return true;
  } else {
    return false;
  }
};
