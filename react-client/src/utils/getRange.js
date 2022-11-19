export const getRange = (data_count, rowsPerPage) => {
  const range = [];
  const num = Math.ceil(data_count / rowsPerPage);
  
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};