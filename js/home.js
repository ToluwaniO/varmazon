/**
 * Created by Awesome-Tbee on 12/7/2016.
 */
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCnpoOmbS4ZkbCRZI4e-TGUvSd2EdhpNlc",
    authDomain: "vamazon-9e59d.firebaseapp.com",
    databaseURL: "https://vamazon-9e59d.firebaseio.com",
    storageBucket: "vamazon-9e59d.appspot.com",
    messagingSenderId: "1063431602484"
};
firebase.initializeApp(config);
var uid = ''

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var person = firebase.auth().currentUser;

        if (person != null){
            uid = person.uid;
            console.log(uid)
        }
        // User is signed in.


    } else {
        window.open('signIn.html', '_self')
        // No user is signed in.
    }
});

$('#varmazon').on('click', function () {
    window.open('home.html', '_self')
})

$('#home').on('click', function () {
    window.open('home.html', '_self')
})

$('#dashboard').on('click', function () {
    window.open('dashboard.html', '_self')
})

$('#messaging').on('click', function () {
    window.open('messaging.html', '_self')
})

$('#signout').on('click', function () {
    signOut()
})

function signOut(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.open('signIn.html', '_self')
    }, function(error) {
        // An error happened.
        alert('An error occured!\nPlease check your internet connection.')
    });
}