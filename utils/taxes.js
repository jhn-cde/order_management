const getTaxes = (products) => {

  const Subtotal = products.reduce(
    (ac, product)=> ac + product.Unitprice*product.Quantity, 0)
  let Total = Subtotal
  let Taxes = {
    CityTax: 0, CountyTax: 0, StateTax: 0, FederalTax: 0
  }
  
  Taxes.CityTax = Math.round(Total*0.1 * 100) / 100
  Total+=Taxes.CityTax
  Taxes.CountyTax = Math.round(Total*0.05 * 100) / 100
  Total+=Taxes.CountyTax
  Taxes.StateTax = Math.round(Total*0.08 * 100) / 100
  Total+=Taxes.StateTax
  Taxes.FederalTax = Math.round(Total*0.02 * 100) / 100
  Total=Math.round((Total+Taxes.FederalTax)*100)/100
  
  let TotalTaxes = (Taxes.CityTax 
    + Taxes.CountyTax 
    + Taxes.StateTax
    + Taxes.FederalTax)
  TotalTaxes = Math.round(TotalTaxes*100)/100
  return {Taxes, TotalTaxes, Total, Subtotal}
}
module.exports = getTaxes