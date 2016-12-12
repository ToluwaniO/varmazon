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

var items
const itemsRef = firebase.database().ref().child('items')

var x = 0
var space = false


itemsRef.on('child_added', snap => {

    y = snap.val()
    console.log(snap.key)

    var dat = '<div class="col-md-3">' +
        '<div id="' + snap.key + '" class="card ">' +
        '<div id="item'+ snap.key +'" class="card-image"><img class="card_img" src="' + y.imageurl + '"></div>' +
        '<div class="card-name">' + y.name + '</div>' +
        '<div class="card-price">$' + y.price + '</div>' +
        '<div class="card-description">' + y.description + '</div>'+
        '<div class="card-button">EDIT</div>'
        + '</div>'
        + '</div>'

    if(x = 0){
        $('#items').append('<div class="row">' + dat)
        x+=1
    }
    else if(x = 2){
        $('#items').append(dat + '</div>')
        x = 0
    }
    else{
        $('#items').append(dat)
        x+=1
    }


})

itemsRef.on('child_removed', snap => {
    var id = snap.key

    var removed = '<div id="' + id +'" class="card">'+
        '<div id="item'+ id +'" class="card-image"><img class="card_img" src=""></div>' +
        '<div class="card-name">' + "REMOVED" + '</div>' + '</div>'

    $('#' + id).replaceWith(removed)

})