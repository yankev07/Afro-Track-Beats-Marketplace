
/**
 * Variables for the registration page
 */

const registration_firstName = document.getElementById('firstname');
const registration_lastName = document.getElementById('lastname');
const registration_userName = document.getElementById('username');
const registration_email = document.getElementById('email');
const registration_password = document.getElementById('password');
const registration_password_confirm = document.getElementById('confirmpassword');
const registrationBtn = document.getElementById('submitbutton');

const auth = firebase.auth();
const database = firebase.firestore();
const usersCollection = database.collection('users');

//Sends verification emails in the same language as the language used in the
//user's device
auth.useDeviceLanguage();



//Function wrapping all the signup parts including the email verification email
//triggered once the user clicks on the signup button
const signUpFunction = () => {

  var firstName = registration_firstName.value;
  var lastName = registration_lastName.value;
  var userName = registration_userName.value;
  var email = registration_email.value;
  var password = registration_password.value;
  var passwordConfirm = registration_password_confirm.value;


  // First Perform input validation
  if(!firstName){
    alert('Please enter your First name');
    return;
  }

  if(!lastName){
    alert('Please enter your Last (Family) name');
    return;
  }

  if(!userName){
    alert('Please choose a username');
    return;
  }

  if(!email){
    alert('Please specify your email address');
    return;
  }

  if(!password){
    alert('Please choose a password');
    return;
  }

  if (passwordConfirm != password) {
    alert('Passwords do not match!');
    return;
  }

  
  //Built in firebase function responsible for signing up a user
  auth.createUserWithEmailAndPassword(email, password)
  .then(() => {
      console.log('Signed Up Successfully !');
  })
  .catch(error => {
      console.error(error);
  })


  const ID = usersCollection.doc();
  ID.set({
    first_name: firstName,
    last_name: lastName,
    user_name: userName,
    email: email
  });


  auth.currentUser.sendEmailVerification()
  .then(() => {
      console.log('Verification Email Sent Successfully !');
  })
  .catch(error => {
      console.error(error);
  })


  window.location.assign('registerconfirm.html');

  return;
}


registrationBtn.addEventListener('click', e => {
  e.preventDefault();
  signUpFunction();
});

