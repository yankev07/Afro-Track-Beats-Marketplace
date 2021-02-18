
/**
 * Variables for the registration page
 */

const registration_firstName = document.getElementById('registration_firstName');
const registration_lastName = document.getElementById('registration_lastName');
const registration_email = document.getElementById('registration_email');
const registration_birthdate = document.getElementById('registration_birthdate');
const registration_academicLevel = document.getElementById('registration_academicLevel');
const registration_city = document.getElementById('registration_city');
const registration_password = document.getElementById('registration_password');
const registration_password_confirm = document.getElementById('registration_password_confirm');
const registrationBtn = document.getElementById('registrationBtn');

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
  var email = registration_email.value;
  var password = registration_password.value;
  var passwordConfirm = registration_password_confirm.value;
  var birthdate = registration_birthdate.value;
  var academicLevel = registration_academicLevel.value;
  var city = registration_city.value;

  // First Perform input validation
  if(!firstName){
    alert('Please enter your First name');
    return;
  }

  if(!lastName){
    alert('Please enter your Last (Family) name');
    return;
  }

  if(!email){
    alert('Please specify your email address');
    return;
  }

  if(!birthdate){
    alert('Please specify your date of Birth');
    return;
  }

  if(!academicLevel){
    alert('Please specify your Highest Academic Degree');
    return;
  }

  if(!city){
    alert('Please specify the city of your residence');
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
    email: email,
    birthdate: birthdate,
    academic_level: academicLevel,
    city: city
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

