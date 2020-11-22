

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

  }

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