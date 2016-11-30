/**
 * Created by Awesome-Tbee on 11/22/2016.
 */

var goodsInfo = [['calculus', '20'], ['physics', '30'], ['Technical Report Writing', '70']]

var item = '<div class="col-4 card" id="goodItem">'
var bar = ''

for (var i = 0; i < 3; i++){
    bar += '<div class="col-4 card" id="goodItem' + i.toString() + '">' + '<div class="card-image" id="img"' + i.toString() + '> <img src="http://placekitten.com/g/200/300" class="img-responsive"></div>' + '<div class="card-title">'+ goodsInfo[i][0] +'</div>' +
            '<div class="card-price">' + goodsInfo[i][1] + '</div>' + '</div>'

    $('#goodItem' + i.toString()).on('click', function () {
        console.log('hello')
    })
}

$('#goods').append(bar)

var goods = document.querySelector("#goods");

goods.addEventListener('click', openGood, false)

function openGood(e) {

    if(e.target !== e.currentTarget){
        var id = e.target.id
        
    }

}

