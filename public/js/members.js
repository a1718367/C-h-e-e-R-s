$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  searchedWinery = $("#winery-search");

  let memberid;

  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
    memberid = data.id;
    return memberid;
  });

  $.get("/api/wineries").then(function(data){
    console.log(data)
    data.forEach(element => {
      const wineries = renderwineries(element);
      $('#results-container').append(wineries);
    });
  });

  $("#search-for-winery-btn").on("click", searchForWinery);



//####### Booking Event ###########//

$('body').on('click','.bookingbtn',function(){
  let x = $(this).attr("data")
  console.log(x)
  console.log(memberid)
  // booking(10,memberid,x)
  // eventbooking(x)
  shownum(x);

  // $('body').on('click','#bookeventmodalbtn',function(){
  //   const numbooked = $('#numbook-input').val().trim()
  //   booking(numbooked,memberid,x)
  // })
})
  
function shownum(id){
$.get('/api/bookingnumber/' +id, function(data){
  const y = parseInt(data)
  console.log(y, typeof y)
  // console.log(data[0]["Event.capacity"])
  if(y >= 5){
    eventbooking(id, y)
    $('body').on('click','#bookeventmodalbtn', function(){
  
      const numbooked = $('#numbook-input').val().trim();
      if(numbooked <= y){
        booking(numbooked,memberid,id)
        $('#bookingmodal').modal('hide')
        window.location.reload();
      }else{

        $('#numalert').text("Not Enough Places")
      }

  
    })

  }else{
    $('#fullybookedalert').text("Event Fully Booked")
    $('#bookingmodalfull').modal('show')
  }
})
}


function booking(numbooked,mid, eid){
  $.post("/api/createBooking", {
    numberbooked: numbooked,
    UserId: mid,
    EventId: eid
  }).then(function(data){
    console.log(data)
  })
}

$('#bookingmodal').on('hidden.bs.modal', function () {
  $(this).find('form').trigger('reset');
  $(this).find('#placeavail').text("");
  $(this).find('#numalert').text("");

});

function eventbooking(id, num){
  $.get("/api/eventdata/" + id,function(data){
      console.log(data)
      populateeventbooking(data, num);
      $('#bookingmodal').modal("show");

      
  });
};

function populateeventbooking(data, num){
  $('#placeavail').text(num)
  $('#bookingeventname').text(`${data[0].eventname}`);
  $('#bookingeventdate').text(`${data[0].date}`);
  $('#bookingeventtime').text(`${data[0].time}`);  
}

//####### Booking Event ###########//


  function renderwineries(data){
    const block = `
    <div class="col-md-4 card-container mb-2">
    <div class="card-flip">
    <div class="card front">
    <img class="card-img-top img-fluid" src="${data.wineryimage}" alt="card image">
    <div class="card-body winerycard text-dark">
    <div class="card-title">${data.wineryname}</div>
    <div class="card-text">${data.winerydesc}</div>
    
    </div>
    </div>
    <div class="card back">
    <img class="card-img-top img-fluid" src="${data.wineryimage}" alt="card image">
    <div class="card-body winerycard text-dark">
    <div class="card-text">
    <div class="card-title">${data.wineryname}</div>
    <div>Address:<div>
    <div class="card-text">${data.wineaddress}, ${data.winepostcode}</div>
    <div>Email:</div>
    <div class="card-text">${data.wineemail}</div>
    <div>Phone:</div>
    <div class="card-text">${data.winephone}</div>
    <a href="/winerypage/${data.id}"><button class="btn btn-block btn-secondary enterwinery mt-3" data="${data.id}">Enter</button></a>
    </div>
    </div>
    </div>
    </div>
    </div>`
    return block


  }



  function enterwinery(id){
    $.get("/api/enterwinery/" + id,function(){

    }).then(function(result){
      
      console.log(result)
      // const enterwinery = wineryblock(result);
      // $("#results-container").empty()
      // $('#results-container').append(enterwinery)


    }).catch(function(err){
      console.log(err)
    })
  }

  function searchForWinery(event) {
    event.preventDefault();
    let wineryname = searchedWinery.val().trim();
    $.get("/api/wineries_name/" + wineryname, function (data) {
      console.log("in get req")
    }).then(function (data) {
      console.log(data)
      console.log("Search4 Working");
      $("#results-container").empty()
      getwineries(wineryname);

    }).catch(function () {
      console.log("api fail")
    })

  }

  function getwineries(id) {
    $.get("/api/wineries_name/" + id, function (data) {
      console.log(data)
    }).then(function (data) {
      data.forEach(element => {
        const wineries = renderwineries(element);
        $('#results-container').append(wineries)
      });
    })
  };




});

  // $('body').on('click','.enterwinery',function(){
  //   let x = $(this).attr("data")
  //   console.log(x)
  //   enterwinery(x)
    
  // })