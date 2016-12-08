/**
 * Created by Awesome-Tbee on 12/6/2016.
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
var row = '<div class="row">'
var keys = []
var length = 0
var items = []

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

var allItems = document.querySelector('#items')

allItems.addEventListener('click', openIt, false)

var myKeys = null
firebase.database().ref('user_data/' + uid + '/').once('value').then(function (snapshot) {
    myKeys = snapshot.val()

    for (var i in myKeys[uid]){
        keys.push(myKeys[uid][i].key)
    }
    
    length = keys.length
    update()
    
})

function update(){
    var dat = ''
    var i;
    for (i = 0; i < (length); i++){
        getItem(i)
    }

}

function getItem(i){
    firebase.database().ref('items/' + keys[i]).once('value').then(function (snapshot) {
        items.push(snapshot.val())

        if(i+1 == length){
            write(items)
        }

    })
}

function write(items) {
    var dat = ''
    for (var i = 0; i < length; i++){
        dat += '<div class="col-md-3">' +
            '<div class="card ">' +
            '<div id="item'+ i.toString() +'" class="card-image"><img class="card_img" src="' + items[i].imageurl + '"></div>' +
            '<div class="card-name">' + items[i].name + '</div>' +
            '<div class="card-price">$' + items[i].price + '</div>' +
            '<div class="card-description">' + items[i].description + '</div>'+
            '<div class="card-button">EDIT</div>'
            + '</div>'
            + '</div>'



        var x = i+1

        if ((x)%4 == 0){
            $('#items').append(row + dat + '</div>')
            dat = ''
        }
        else if(x == length){
            $('#items').append(row + dat + '</div>')
            dat = ''
        }
    }

}

function openIt(e) {
    if (e.target !== e.currentTarget) {
        var clickedItem = e.target.id;
        if (clickedItem.slice(0,4) == 'item'){

        }
        console.log(e.target.id);
        //alert(clickedItem.toString());
    }
    e.stopPropagation();

}

$('#addNew').on('click', function () {
    window.open('newItem.html', '_self')
})


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
    }, function(error) {
        // An error happened.
        alert('An error occured!\nPlease check your internet connection.')
    });
}