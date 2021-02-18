
/**
 * Variables for the login page
 */

const login_email = document.getElementById('login_email');
const login_password = document.getElementById('login_password');
const loginBtn = document.getElementById('loginBtn');

const auth = firebase.auth();
const database = firebase.firestore();
const usersCollection = database.collection('users');


//Function wrapping all the signup parts including the email verification email
//triggered once the user clicks on the signup button
const signInFunction = () => {

  var email = login_email.value;
  var password = login_password.value;

  // First Perform input validation
  if(!email){
    alert('Please enter your email address');
    return;
  }

  if(!password){
    alert('Please enter your password');
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
    window.location.assign('dashboard.html');
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });

  alert('Wrong credentials!');
  return;
}


loginBtn.addEventListener('click', e => {
  e.preventDefault();
  signInFunction();
});

