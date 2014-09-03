$(document).ready(function(){

// Define vars 
var $target = $("#let-me-take-a-selfie ul");
var $introTime = 5000;

function displayMusic(){
  var ctx = $('.site-wrapper');
  ctx.prepend('<audio autoplay><source src="audio/selfie_chainsmoker.ogg" type="audio/ogg"><source src="audio/selfie_chainsmoker.mp3" type="audio/mpeg">Your browser does not support the audio tag.</audio>')
}

function appendSelfies(){

  setTimeout(function(){
    displayMusic();
  }, $introTime/2)
  setTimeout(function(){
   $.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,
    url: "https://api.instagram.com/v1/tags/selfie/media/recent?access_token=52854534.5b9e1e6.cfde91dfcf3c4da5b2744237ccf9264a",
    success: function(data) {
      for (var i = 0; i < 20; i++) {
        $target.append("<li class='pop'><a target='_blank' href='" + data.data[i].link + "'><img src='" + data.data[i].images.low_resolution.url +"'></img></a></li>");
      }
    }
  });


 }, $introTime)

}

function RefreshSelfies(){
 setInterval(function(){

  $.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,
    url: "https://api.instagram.com/v1/tags/selfie/media/recent?access_token=52854534.5b9e1e6.cfde91dfcf3c4da5b2744237ccf9264a",
    success: function(data) {
      for (var i = 0; i < 20; i++) {
        $target.prepend("<li class='pop'><a target='_blank' href='" + data.data[i].link + "'><img src='" + data.data[i].images.low_resolution.url +"'></img></a></li>");
      }
    }
  });

}, 3000)
}


// Unrelated to the selfies script
function fixTwit(){

  setTimeout(function(){ var cssfix = '#twitter-widget-0,iframe{display:inline !important;position:relative !important;top:5px !important;}';
    var iframe = $('body iframe#twitter-widget-0');
    iframe.prepend('<style>'+ cssfix +'</style>');
  },100);

} 
//\\//\\//\\//\\//\\//\\//\\//\\//

function deploy(){
  appendSelfies();
  RefreshSelfies();
  fixTwit();
}

deploy();

});

