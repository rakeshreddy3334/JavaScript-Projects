
console.log("hi");
var x="hi";
var url = "http://api.giphy.com/v1/gifs/search?q="+x+"&api_key=dc6zaTOxFJmzC";
var GiphyAJAXCall = new XMLHttpRequest();
GiphyAJAXCall.open( 'GET', url );
GiphyAJAXCall.send();

GiphyAJAXCall.addEventListener('load',function(e){
  
    var data = e.target.response;
    pushToDOM(data);
  
});

function pushToDOM(input) {
  
    var response = JSON.parse(input);
    var images = response.data;
    var i=0;
    var container=document.getElementById("tv");
    var x=setInterval(function(){
        var src = images[i].images.fixed_height.url;
        container.innerHTML= "<img src='"+ src +"\'>";
        i+=1;
        console.log(i);
        if(i==20){
            i=0;
        }
        }, 2000);
    }