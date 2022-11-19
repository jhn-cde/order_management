const getProductById = ( products, id ) => {
  return products.find( product => product.id === Number(id) );
}

export default getProductById