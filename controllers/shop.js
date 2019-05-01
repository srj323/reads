const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows,fieldData]) => {
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err => console.log(err));
};

exports.getProfile = (req, res, next) => {
    res.render('profile/user-profile', {
      pageTitle: 'Profile',
      path: '/user-profile'
    });
};

exports.getProduct = (req, res, next) => {
  const prodASIN = req.params.productASIN;
  console.log(prodASIN);
  Product.findByASIN(prodASIN)
  .then(([product]) => {
    console.log(product);
    res.render('shop/product-detail', {
      product: product[0],
      pageTitle: product.Title,
      path: '/products'
    });
  })
  .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/index', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/'
      });
    });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart =>{
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(prod => prod.ASIN === product.ASIN);
        if(cartProductData) {
          cartProducts.push({productData: product, qty: cartProductData.qty});
        }
      }
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: cartProducts
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodASIN = req.body.productASIN;
  Product.findByASIN(prodASIN, product => {
    Cart.addProduct(prodASIN, product.price);
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req,res,next) => {
  const prodASIN = req.body.productASIN;
  Product.findByASIN(prodASIN, product => {
    Cart.deleteProduct(prodASIN, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
