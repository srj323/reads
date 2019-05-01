
const Profile = require('../models/profile');


exports.getProfile = (req, res, next) => {
  const UsrId = req.params.UserId;
  Profile.findByUserId(UsrId)
  .then(([profile]) => {
    res.render('profile/user-profile', {
      profile: profile[0],
      pageTitle: 'Your Profile',
      path: '/profile',
      alert: false
    });
  })
  .catch(err => console.log(err));
};

exports.getProfileerr = (req, res, next) => {
  const UsrId = req.params.UserId;
  const Alert = req.params.alert;
  Profile.findByUserId(UsrId)
  .then(([profile]) => {
    res.render('profile/user-profile', {
      profile: profile[0],
      pageTitle: 'Your Profile',
      path: '/profile',
      alert: Alert
    });
  })
  .catch(err => console.log(err));
};

exports.getEditProfile = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const UserId = req.params.UserId;
  Profile.findByUserId(UserId)
    // if(!profile) {
    //   return res.redirect('/');
    // }
    .then(([profile]) => {
       res.render('profile/edit-profile', {
          pageTitle: 'Edit Profile',
          path: '/profile/edit-profile',
          editing: editMode,
          profile: profile[0]
        });
      })
      .catch(err => console.log(err));
};



// exports.postProfile = (req, res, next) => {
//   const UsrId = req.params.UserId;
//   console.log(UsrId);
//   Profile.findByUserId(UsrId)
//   .then(([profile]) => {
//     console.log(profile);
//     res.render('profile/edit-profile', {
//       profile: profile[0],
//       pageTitle: 'Your Profile',
//       path: '/profile'
//     });
//   })
//   .catch(err => console.log(err));
// };


exports.postEditProfile = (req,res,next) => {
  const profileUserId = req.body.profileUserId;
  const updatedFirstName = req.body.FirstName;
  const updatedLastName = req.body.LastName;
  const updatedAge = req.body.Age;
  const updatedSex = req.body.Sex;
  const updatedEmail = req.body.Email;
  const updatedImage = null;
  const updatedProfile = new Profile(
    profileUserId, updatedFirstName, updatedLastName, updatedAge, updatedSex, updatedEmail, updatedImage
  );
if((updatedAge > 0) && ((updatedSex === 'M') || (updatedSex === 'F')) ) {
  updatedProfile.update(profileUserId, updatedFirstName, updatedLastName, updatedAge, updatedSex, updatedEmail, updatedImage).then((profile) => {
      res.redirect('/profile/'+profileUserId);
    })

  }
  else{
    console.log('Enter the valid age or gender');
    res.redirect('/profile/'+profileUserId+'/Enter the valid age or gender');


  }


};
