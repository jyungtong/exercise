export default [
  {
    id: 1,
    username: 'unilever',
    password: 'unilever',
    discounts: [
      {
        product_id: 'classic',
        type: 'x-for-y',
        x: 3,
        y: 2
      }
    ]
  },
  {
    id: 2,
    username: 'apple',
    password: 'apple',
    discounts: [
      {
        product_id: 'standout',
        type: 'equal-or-more',
        x: 1,
        price: 299.99
      }
    ]
  },
  {
    id: 3,
    username: 'nike',
    password: 'nike',
    discounts: [
      {
        product_id: 'premium',
        type: 'equal-or-more',
        x: 4,
        price: 379.99
      }
    ]
  },
  {
    id: 4,
    username: 'ford',
    password: 'ford',
    discounts: [
      {
        product_id: 'classic',
        type: 'x-for-y',
        x: 5,
        y: 4
      },
      {
        product_id: 'standout',
        type: 'equal-or-more',
        x: 1,
        price: 309.99
      },
      {
        product_id: 'premium',
        type: 'equal-or-more',
        x: 3,
        price: 389.99
      }
    ]
  }
]
