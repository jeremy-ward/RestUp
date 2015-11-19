module.exports={
  Order : [
    {path: 'customer'},
    {path: 'lineItems.supplier'},
    {path : 'lineItems.product'}
  ],
  Product : [
    {path : "supplier"}
  ]
};