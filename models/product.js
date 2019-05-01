// const fs = require('fs');
// const path = require('path');
const db  = require('../util/database');
const Cart = require('./cart');
// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'products.json'
// );

// const getProductsFromFile = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

module.exports = class Product {
  constructor(ASIN, FileName, ImageUrl, Title, Author, price, description) {
    this.ASIN = ASIN;
    this.FileName = FileName;
    this.ImageUrl = ImageUrl;
    this.Title = Title;
    this.Author = Author;
    this.price = price;
    this.description = description;
  }

  save() {
    db.execute('INSERT INTO Books (ASIN, FileName, ImageUrl, Title, Author, price, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
  [this.ASIN, this.FileName, this.ImageUrl, this.Title, this.Author, this.price, this.description]
);
    // getProductsFromFile(products => {
    //   if (this.id) {
    //     const existingProductIndex = products.findIndex(prod => prod.id === this.id);
    //     const updatedProducts = [...products];
    //     updatedProducts[existingProductIndex] = this;
    //     fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    //       console.log(err);
    //     });
    //   }
    //   else{
    //   this.id = Math.random().toString();
    //   products.push(this);
    //   fs.writeFile(p, JSON.stringify(products), err => {
    //     console.log(err);
    //   });
    // }
    // });
  }


  static deleteByASIN(ASIN) {

    // getProductsFromFile(products => {
    //   const product = products.find(prod => prod.id === id);
    //   const updatedProducts = products.filter(prod => prod.id !== id);
    //   fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    //     if (!err) {
    //         Cart.deleteProduct(id,product.price);
    //     }
    //   });
    // });

  }

  static fetchAll() {
    return db.execute('SELECT * FROM Books');
    // getProductsFromFile(cb);
  }

  static findByASIN(ASIN) {
    return db.execute('SELECT * FROM Books WHERE Books.ASIN = ?', [ASIN]);
  //   getProductsFromFile(products => {
  //     const product = pr oducts.find(p => p.id === id);
  //     cb(product);
  //   });
  }
};
