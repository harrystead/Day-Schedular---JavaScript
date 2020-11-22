

function getLocalStorage(key) {
    let value = localStorage.getItem(key);
    if (value) {
        $(`#text${key}`).text(value);
    }
  }

$( document ).ready(function() {

    var clearBtn = $(`<button>`);
    clearBtn.addClass("clear-button")
    clearBtn.text("Clear All")
    $("#clear-btn-div").append(clearBtn);
  
    $("#currentDay").text(moment().format("dddd, MMMM Do"));

for (let i = 9; i < 18; i++) {
    //loop through the to create a row and 4 columns for each hour between 9-5.
    //so var = i represents the hour.
    //give each column the id of the hour it represents - e.g, first column is 9am, and set 
  
      // create a row
      var row = $(`<div data-time=${i} id='${i}' class="row">`);

      // create a column
      //use bootstrap to display the table.
      var col1 = $('<div class="col-sm-2"> <p class="hour">' + formatAMPM(i) + '</p>'); //

      //create column 2
      var col2 = $(`<div class="col-sm-8 past"><textarea id=text${i} class="description" placeholder="Add your event here..."></textarea>`);        
     
      //create column 3
      var col3 = $(`<div class="col-sm-1"><button class="saveBtn" id=${i}><i class="fas fa-save"></i></button>`); 
      //fontawesome to grab save and remove icons.
      
      // append col to row
      row.append(col1);
      row.append(col2);
      row.append(col3);

      // last step add rows to container
      $(".container").append(row);

      getLocalStorage(i);

  }

  
  //display am or pm depending on the time of day - and then link to first column, so that time displays alongside am/pm.
  function formatAMPM(hours) {
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return hours + ampm;
}

formatAMPM(); //call function

function updateColors(){
    var currentTime = new Date().getHours();
    //get current hours.
    for (var i = 9; i < 18; i++) { 
      //loop through hours. 
    console.log(currentTime, $(`#${i}`).data("time"));
     if ($(`#${i}`).data("time") == currentTime){
        $(`#text${i}`).addClass( "present");
        //if current timer is equal to a value in the loop - set class to present.
    } else if (currentTime < $(`#${i}`).data("time")) {
        $(`#text${i}`).addClass( "future");
    }
    //if current time is less than value in loop, add class of future.
}

//style using css for present and future classes - changing colors when time changes.

}

//set timer - real time. and call function alongside with it. 
setInterval(function() {
updateColors();
}, 1000);

  var saveBtn = $('.saveBtn');
saveBtn.on('click', function(){
  var eventId = $(this).attr('id');
  var eventText = $(this).parent().siblings().children('.description').val();
  localStorage.setItem(eventId, eventText);
});

//clear description and local storage.
clearBtn.on('click', function(){
$('.description').val("");
localStorage.clear();

});

});