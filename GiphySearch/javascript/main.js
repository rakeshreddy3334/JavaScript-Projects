

document.querySelector(".js-go").addEventListener('click',function(){

    var input = document.querySelector("input").value;
    var container = document.querySelector(".js-container");  
    container.innerHTML="";
    work(input);
  
  });
  
  document.querySelector(".js-userinput").addEventListener('keyup',function(e){
  
    var input = document.querySelector("input").value;
  
    // if the key ENTER is pressed...
    if(e.which === 13) {
        var container = document.querySelector(".js-container");  
        container.innerHTML="<p>giphys are loading</p>";
        work(input);
    }
  
  });
  
  /* 2. do the data stuff with the API */
  function work(input)
  {
  var x=input;
  var url = "http://api.giphy.com/v1/gifs/search?q="+x+"&api_key=dc6zaTOxFJmzC";
  
  // AJAX Request
  var GiphyAJAXCall = new XMLHttpRequest();
  GiphyAJAXCall.open( 'GET', url );
  GiphyAJAXCall.send();
  
  GiphyAJAXCall.addEventListener('load',function(e){
  
    var data = e.target.response;
    pushToDOM(data);
  
  });
}
  
  /* 3. Show me the GIFs */
  
  
  function pushToDOM(input) {
  
    var response = JSON.parse(input);
  
    var imageUrls = response.data;

    var container = document.querySelector(".js-container");
    
    imageUrls.forEach(function(image){
  
      var src = image.images.fixed_height.url;
      console.log(src);
  
      
      container.innerHTML += "<img src=\"" + src + "\" class=\"container-image\">";
  
    });
  
  }