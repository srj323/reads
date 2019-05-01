
const db  = require('../util/database');



module.exports = class Profile {
  constructor(UserId, FirstName, LastName, Age, Sex, Email, Image) {
    this.UserId = UserId;
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.Age = Age;
    this.Sex = Sex;
    this.Email = Email;
    this.Image = Image;
  }

  save() {
    db.execute('INSERT INTO Profile (UserId, FirstName, LastName, Age, Sex, Email, Image) VALUES (?, ?, ?, ?, ?, ?, ?)',
  [  this.UserId, this.FirstName, this.LastName, this.Age, this.Sex, this.Email, this.Image]
)}

  update(profileUserId, updatedFirstName, updatedLastName, updatedAge, updatedSex, updatedEmail, updatedImage) {
    // db.execute('CREATE TRIGGER  Check_age  BEFORE INSERT ON employee')
    // db.execute('FOR EACH ROW')
    // db.execute('BEGIN')
    // db.execute('IF updatedEmail = profile.Email THEN SIGNAL SQLSTATE 45000')
    // db.execute( 'SET MESSAGE_TEXT = ERROR:AGE MUST BE ATLEAST 25 YEARS!')
    // db.execute('END IF;')
    // db.execute('END;')
      return db.execute('UPDATE Profile SET FirstName = ?, LastName = ?, Age = ?, Sex = ?, Email = ?, Image = ?  WHERE Profile.UserId = ?',
      [updatedFirstName, updatedLastName, updatedAge, updatedSex, updatedEmail, updatedImage, profileUserId]);

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
  };



  static fetchAll() {
    return db.execute('SELECT * FROM Profile');
    // getProductsFromFile(cb);
  }

  static findByUserId(UserId) {
    //db.execute('SELECT * FROM profile WHERE profile.UserId = ?', [UserId]).then(result => console.log(result[0][0]));
    return db.execute('SELECT * FROM Profile WHERE Profile.UserId = ?', [UserId]);
  //   getProductsFromFile(products => {
  //     const product = pr oducts.find(p => p.id === id);
  //     cb(product);
  //   });
  }
};
