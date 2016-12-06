/**
 * Created by Awesome-Tbee on 12/5/2016.
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
// Get a reference to the database service
var img = null

$('#itemImage').on('change', function (e) {
    var file = e.target.files[0]

    var storageRef = firebase.storage().ref('item_images/' + file.name)
    var task = storageRef.put(file)

    task.on('state_changed', 
    function progress(snapshot) {
        var uploader = document.getElementById('uploader')
        var percentage = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
        uploader.value = percentage

        if (percentage == 100){
            img = snapshot.downloadURL
            console.log(img)
        }
    },

    function error(err) {

    },

    function complete() {

    })
})

$('#upload').on('click', function () {
    console.log(upload)
  upload()
})

function upload(){
    var name = $('#itemName').val().trim()
    var price = $('#itemPrice').val().trim()
    var desc = $('#itemDesc').val().trim()
    var image_url = getUrl()

    var data = {
        name: name,
        price: price,
        imageurl : img
    }

    var key = firebase.database().ref().push(data).key;
    console.log(key)
}

function getUrl(x) {
    
}