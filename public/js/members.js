$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  searchedWinery = $("#winery-search");



  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });

  $.get("/api/wineries").then(function(data){
    console.log(data)
    data.forEach(element => {
      const wineries = renderwineries(element);
      $('#results-container').append(wineries);
    });
  });

  $("#search-for-winery-btn").on("click", searchForWinery);

  // $('body').on('click','.enterwinery',function(){
  //   let x = $(this).attr("data")
  //   console.log(x)
  //   enterwinery(x)
    
  // })


  function renderwineries(data){
    const block = `
    <div class="col-md-4 card-container mb-2">
    <div class="card-flip">
    <div class="card front">
    <img class="card-img-top" src="${data.wineryimage}" alt="card image">
    <div class="card-body winerycard text-dark">
    <div class="card-title">${data.wineryname}</div>
    <div class="card-text">${data.winerydesc}</div>
    
    </div>
    </div>
    <div class="card back">
    <img class="card-img-top" src="${data.wineryimage}" alt="card image">
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