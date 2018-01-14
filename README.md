# GDP Coding Exercise
> Calculate different discount for different user

## Installation
```sh
yarn
```

## Usage Example
```sh
yarn start
```

### Create a new user
```sh
curl -XPOST \
      -H'content-type: application/json' \
      localhost:8080/api/users/create \
      -d'{
        "username": "testuser",
        "password": "testuser"
      }'
```

### List users
```sh
curl -XGET \
      -H'content-type: application/json' \
      localhost:8080/api/users/list \
```

### Get user cart
```sh
curl -XGET -H'content-type: application/json' \
      -H'x-auth-username: testuser' \
      -H'x-auth-password: testuser' \
      localhost:8080/api/carts/get
```

### Add products to cart
```sh
curl -XPOST -H'content-type: application/json' \
      -H'x-auth-username: testuser' \
      -H'x-auth-password: testuser' \
      localhost:8080/api/carts/add \
      -d'{
        "product_id": "classic",
        "add": 3
      }'
```

### Reduce product count in cart
```sh
curl -XPOST -H'content-type: application/json' \
      -H'x-auth-username: testuser' \
      -H'x-auth-password: testuser' \
      localhost:8080/api/carts/reduce \
      -d'{
        "product_id": "classic",
        "reduce": 2
      }'
```

### Checkout the cart
```sh
curl -XPOST -H'content-type: application/json' \
      -H'x-auth-username: testuser' \
      -H'x-auth-password: testuser' \
      localhost:8080/api/carts/checkout
```

### Add discount package to user
1. This will add `x-for-y` discount type:
```sh
curl -XPOST -H'content-type: application/json' \
      localhost:8080/api/users/discounts/add \
      -d'{
        "product_id": "classic",
        "type": "x-for-y",
        "x": 5,
        "y": 3,
        "username": "testuser"
      }'
```

2. This will add `equal-or-more` discount type:
```sh
curl -XPOST -H'content-type: application/json' \
      localhost:8080/api/users/discounts/add \
      -d'{
        "product_id": "premium",
        "type": "equal-or-more",
        "x": 1,
        "price": 301.11,
        "username": "testuser"
      }'
```

### Remove discount package from user
```sh
curl -XPOST -H'content-type: application/json' \
      localhost:8080/api/users/discounts/remove \
      -d'{
        "product_id": "premium",
        "username": "testuser"
      }'
```


## Testing
```sh
yarn test
```

You can find the [Integration Test](src/__test__/integration.test.js) which can show you how the app is working.
