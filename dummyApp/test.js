console.log("linked");

var youtubeKey = "AIzaSyC6BkKzkgAhJoLwYgb2JgtY6UhCEqdN0ng";
var queryURL = "https://www.googleapis.com/youtube/v3/search";
var searchVideos = ["cats", "food", "dogs"];



$(document).ready(function() {
  
renderButtons();

  $("#search-button").on("click", function() {
    console.log("clicked");

    event.preventDefault();

    youtubeApiCall();
    
    var video = $("#search-yt").val().trim();

    searchVideos.push(video);

    renderButtons();
    

  });

  $(".new-search").on("click", function() {
    var buttonText = $(this).text();
    $.ajax({
      cache: false,
      data: $.extend({
        key: youtubeKey,
        part:"snippet",
        q: buttonText
      }, {maxResults: 2}),
      dataType: "json",
      url: queryURL,
      timeout: 5000,
      type:"GET"

    }).done(function(response) {
      console.log(response);
        for (var i = 0; i < response.items.length; i++) {
          var title = response.items[i].snippet.thumbnails.title;
          var videoId = response.items[i].id.videoId;

          $("#player").append('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '"' + 'frameborder="0" allowfullscreen></iframe>');
        }
    });

  });


  $("#address-submit").on("click", function() {
    var currentAddress = $("#current-address").val().trim();
    var cardAddress = $("#card-address").val().trim();

    if(currentAddress === cardAddress) {
      console.log("score!");
      $("#address-success").append('<img src="http://vignette2.wikia.nocookie.net/sonic/images/9/9c/Mario_-_Mario_Party_10.png/revision/latest?cb=20150609205200">');
    }else {
      $("#address-fail").append('<img src="http://download.gamezone.com/uploads/image/data/1204957/star-wars-darth-vader-sixth-scale-feature-1000763.jpg">');
      console.log("wrong address");
    }

  });


});


function youtubeApiCall() {
   var searchText = $("#search-yt").val().trim();

    

    $.ajax({
      cache: false,
      data: $.extend({
        key: youtubeKey,
        part:"snippet",
        q: searchText
      }, {maxResults: 2}),
      dataType: "json",
    	url: queryURL,
      timeout: 5000,
    	type:"GET"

    }).done(function(response) {
      console.log(response);
        for (var i = 0; i < response.items.length; i++) {
          var title = response.items[i].snippet.thumbnails.title;
          var videoId = response.items[i].id.videoId;

          $("#player").append('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '"' + 'frameborder="0" allowfullscreen></iframe>');
        }
    });

}

function renderButtons() {
  $("#button-location").empty();

  // Looping through the array of search items
        for (var i = 0; i < searchVideos.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("new-search");
          a.addClass("btn btn-primary");
          // Adding a data-attribute
          a.attr("data-name", searchVideos[i]);
          // Providing the initial button text
          a.text(searchVideos[i]);
          // Adding the button to the buttons-view div
          $("#button-location").append(a);
        }
}












