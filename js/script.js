
document.addEventListener('DOMContentLoaded', function () {
    // Sliding
    console.log()
    const container = document.querySelector('.container');

    const registerBtn = document.querySelector('#signup');
    const loginBtn = document.querySelector('#signin');

    registerBtn.addEventListener('click', function () {
        container.classList.add('right-panel-active');
    });

    loginBtn.addEventListener('click', function () {
        container.classList.remove('right-panel-active');
        console.log('ssdsds');
    });

    //Validation
    const form = document.getElementById('form');
    const span = document.querySelector('.error-msg');

    const auth = firebase.auth();
    const database = firebase.firestore();
    const usersCollection = database.collection('users');

    auth.useDeviceLanguage();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.querySelector('#username').value;
        const email = document.querySelector('#email').value;
        const pass1 = document.querySelector('#pass1').value;
        const pass2 = document.querySelector('#pass2').value;
        const agree = document.querySelector('#agree').checked;
        console.log('kartofel');

        let errorMsg ='';

        if(username.length < 3) {
            errorMsg += 'Please Enter Correct Username <br>';
        }
        if(!email.includes('@')) {
            errorMsg =+ 'Wrong Email! <br>';
        }
        if(pass1.length < 5) {
            errorMsg += 'Password field must be at least 5 characters <br>';
        }
        if(pass1 !== pass2) {
            errorMsg += 'Password confirmation does not match';
        }
        if(!errorMsg && agree) {
            console.log('succes');
        } else {
            span.innerText = errorMsg;
            e.preventDefault();
        }

        //Built in firebase function responsible for signing up a user
        auth.createUserWithEmailAndPassword(email, password).then(() => {
            console.log('Signed Up Successfully !');
        })
        .catch(error => {
            console.error(error);
        })

        const ID = usersCollection.doc();
        ID.set({
            userName: username,
            email: email
        });

        auth.currentUser.sendEmailVerification()
        .then(() => {
            console.log('Verification Email Sent Successfully !');
        })
        .catch(error => {
            console.error(error);
        })

        window.location.assign('emailconfirmation.html');

    });

});
