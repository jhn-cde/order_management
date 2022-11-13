export const getOrderByNumber = ( orders, number ) => {
  return orders.find( order => order.Number === Number(number) );
}