// database methods

// export
module.exports = {
  // db methods
  ...require('./product'),
  ...require('./products'),
  ...require('./users'),
  ...require('./orders'),
  ...require('./order_products'),
  ...require('./client')
}
