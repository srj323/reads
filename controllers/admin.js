const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const ASIN = req.body.ASIN;
  const FileName = req.body.FileName;
  const ImageUrl = req.body.imageUrl;
  const Title = req.body.Title;
  const Author = req.body.Author;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,FileName, ImageUrl,Title, Author, price, description);
  product
  .save()
  .then(() => {
    res.redirect('/');
  })
  .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const prodASIN = req.params.productASIN;
  Product.findByASIN(prodASIN, product => {
    if(!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });

  });

};

exports.postEditProduct = (req,res,next) => {
  const prodASIN = req.body.productASIN;
  const prodFileName = req.body.productFileName;
  const updatedImageUrl = req.body.ImageUrl;
  const updatedTitle = req.body.Title;
  const updatedAuthor = req.body.Author;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(
    prodASIN,
    prodFileName,
    updatedImageUrl,
    updatedTitle,
    updatedAuthor,
    updatedPrice,
    updatedDesc
  );
  updatedProduct.save();
  res.redirect('/admin/products');

};


exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodASIN = req.body.productASIN;
  Product.deleteByASIN(prodASIN);
  res.redirect('/admin/products');
};
