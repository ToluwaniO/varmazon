  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCnpoOmbS4ZkbCRZI4e-TGUvSd2EdhpNlc",
    authDomain: "vamazon-9e59d.firebaseapp.com",
    databaseURL: "https://vamazon-9e59d.firebaseio.com",
    storageBucket: "vamazon-9e59d.appspot.com",
    messagingSenderId: "1063431602484"
  };
  firebase.initializeApp(config);

  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('signed in')
      window.open('dashboard.html', '_self')
    } else {
      // No user is signed in.
    }
  });

/*var data = {
  "name" : "hello",
  "age" : "16"
}

var ref = firebase.database().ref();

var key = ref.push(data).getKey()

console.log(key);
*/

var emailTxt = document.getElementById("emailText")
var passwordTxt = document.getElementById("passwordText")

$('#signInBut').on('click', function(){
  signIn(emailTxt.value, passwordTxt.value)
})

$('#googleSignIn').on('click', function(){
  signInGoogle()
})

function signIn(email, password){

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorMessage)
    console.log(errorCode.toString())
  // ...
});
}

function signInGoogle(){
  firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
  console.log(user.toString())
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

firebase.auth().signInWithRedirect(provider);

firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // ...
  }
  // The signed-in user info.
  var user = result.user;
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorMessage)
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
}
