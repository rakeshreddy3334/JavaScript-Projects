

var MySoundCloudAPI ={}

MySoundCloudAPI.init=function(){
  SC.initialize({
  client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
  });
}

MySoundCloudAPI.getTrack = function(ourInput){
  SC.get('/tracks', 
        {q: ourInput}).then(function(tracks) {
        console.log(ourInput);
        MySoundCloudAPI.renderTracks(tracks);
  });
}

MySoundCloudAPI.renderTracks = function(tracks){
  tracks.forEach(function(track){
    //card 
    //console.log(track);
    var card = document.createElement('div');
    card.classList.add('card');

    //image
    var imageDiv = document.createElement('div');
    imageDiv.classList.add('image');

    var image_img = document.createElement('img');
    image_img.classList.add('image_img');
    image_img.src = track.artwork_url || 'http://lorempixel.com/100/100/abstract/';

    imageDiv.appendChild(image_img);

    //content 
    var content = document.createElement('div');
    content.classList.add('content');

    var header = document.createElement('div');
    header.classList.add('header');
    header.innerHTML = '<a href="'+track.permalink_url+'" target="_blank">'+track.title+'</a>';

    //button
    var button = document.createElement('div');
    button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

    var icon = document.createElement('i');
    icon.classList.add('add', 'icon');

    var buttonText = document.createElement('span');
    buttonText.innerHTML = 'Add to playlist';

    //appendChild
    content.appendChild(header);

    button.appendChild(icon);
    button.appendChild(buttonText);
    button.addEventListener('click',function(){
       // console.log("Click");
        MySoundCloudAPI.embedTo(track.permalink_url);
    })

    card.appendChild(imageDiv);
    card.appendChild(content);
    card.appendChild(button);

    var searchResults = document.querySelector('.js-search-results');
    searchResults.appendChild(card);
    //console.log("hi");

    });
}


//Getting input from search button

var EventClick = {}

EventClick.searchButton = function(){
  document.querySelector('.js-submit').addEventListener('click',function(){
      var x=document.querySelector('.js-search-results');
      x.innerHTML="";
      var input= document.querySelector('.input-search').value;
      MySoundCloudAPI.getTrack(input);
  })

}
EventClick.Keyboardkey = function(){
  document.querySelector('.input-search').addEventListener('keyup',function(e){
    if(e.which === 13) {  
      var x=document.querySelector('.js-search-results');
      x.innerHTML="";
      var input= document.querySelector('.input-search').value;
      MySoundCloudAPI.getTrack(input);
    }
  })
}

//calling our methods
MySoundCloudAPI.init();
//MySoundCloudAPI.getTrack('Rilo kiley');
EventClick.searchButton();
EventClick.Keyboardkey ();

//Embedding to our left side
MySoundCloudAPI.embedTo= function(songURL){
  SC.oEmbed(songURL, {
      auto_play: true
    }).then(function(embed){
      //console.log('oEmbed response: ', embed);
      var sidebar = document.querySelector('.js-playlist');
      
      var box=document.createElement("div");
      box.innerHTML=embed.html;

      sidebar.insertBefore(box,sidebar.firstChild);
      //to save locally the items added in playlist
      localStorage.setItem("key",sidebar.innerHTML)
  });
}

// To display the items stored in the local storage after reloading
var sidebar = document.querySelector('.js-playlist');
sidebar.innerHTML=localStorage.getItem("key")

document.querySelector('.reset').addEventListener('click',function(){
  localStorage.clear();
  sidebar.innerHTML=localStorage.getItem("key")
})

