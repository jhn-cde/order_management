export const sliceData = ( data, page_size, page_number ) => {
  return data.slice((page_number - 1) * page_size, page_number * page_size)
}

export const calculateRange = (data, rowsPerPage) => {
  const range = [];
  const num = Math.ceil(data.length / rowsPerPage);
  
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};