import _ from 'lodash'

export default function ({ discounts, cart, products }) {
  /*
   * Calculate item in cart
   */
  let productSubtotals = [] // subtotal will temporary stored here
  const { products: cartProducts } = cart
  for (let i = 0; i < cartProducts.length; i++) {
    const { product_id: productId, count } = cartProducts[i]

    /*
     * Retrieve base product from db
     */
    const { price: basePrice, ...baseProduct } = _.find(products, ['id', productId])

    /*
     * Check if user has discount for the product
     */
    const discountProduct = discounts &&
                            discounts.length > 0 &&
                            _.find(discounts, ['product_id', productId])
    const discountType = discountProduct ? discountProduct.type : undefined

    /*
     * Switch to specific calculation rules based on discount type
     */
    let subtotal = 0
    let discount = 0
    switch (discountType) {
      case 'x-for-y': {
        const { x, y } = discountProduct

        /*
         * Separate out the product in cart which both entitled to discount
         * and not entitled to the discount
         */
        const numberForDiscount = parseInt(count / x)
        const offset = count % x

        /*
         * Calculate number for discount first
         */
        subtotal += numberForDiscount * y * basePrice

        /*
         * Calculate product count that is not entitled to the discount
         */
        subtotal += offset * basePrice

        /*
         * Get the discounted amount
         */
        discount = (count * basePrice) - subtotal
      } break
      case 'equal-or-more': {
        const { x, price: discountPrice } = discountProduct

        /*
         * If product count is more than or equal to x
         * true: count * discountPrice
         * false: count * basePrice
         */
        subtotal = (count >= x) ? count * discountPrice : count * basePrice

        /*
         * Get discounted amount
         */
        discount = (count * basePrice) - subtotal
      } break
      default:
        subtotal = basePrice * count
    }

    /*
     * Push the subtotal into productSubtotals
     */
    productSubtotals.push({
      product_id: productId,
      name: baseProduct.name,
      subtotal: subtotal.toFixed(2) / 1,
      discount: discount.toFixed(2) / 1,
      count
    })
  }

  /*
   * Calculate total
   */
  let total = productSubtotals.reduce((sum, { subtotal }) => sum + subtotal, 0)

  return Promise.resolve({
    products: productSubtotals,
    total: total.toFixed(2) / 1
  })

  /*
   * Example of return structure
   *
  return Promise.resolve({
    sum: 987.97,
    products: [
      {
        product_id: 'classic',
        count: 3,
        subtotal: 539.98,
        discount: 269.99
      },
      {
        product_id: 'premium',
        count: 1,
        subtotal: 394.99,
        discount: 0
      }
    ]
  })
  */
}
