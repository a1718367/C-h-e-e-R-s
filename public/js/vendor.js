$(document).ready(function () {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page

    let memberid;
    const wname = $('#wineryname-input');
    const waddress = $('#wineaddress-input');
    const wpostcode = $('#winepostcode-input');
    const wphone = $('#winephone-input');
    const wemail = $('#wineemail-input');


//Adding Event handlers for adding of wines,wineries and events modals.
    $('body').on('click','.wine-input',function(){
        let wineryID = ($(this).attr("data"));
        $('#winemodalheader').text("Add Wine");
        $('#winemodalbtn').text("Add Wine");
        // document.getElementById('winemodal').classList.remove('editwine')
        // document.getElementById('winemodal').classList.add('addwine')
        $("#editmodal").modal('show');
        $('#addwinemodalbtn').show();
        $('#editwinemodalbtn').hide();

        wineSubmit(wineryID);
    });

    $('body').on('click','.winery-addition',function(){
        $('#wineriesmodalheader').text("Add Winery");
        // $('#wineriesmodalbtn').text("Add Winery");
        $('#editwineriesmodal').modal('show');
        $('#addwineriesmodalbtn').show();
        $('#editwineriesmodalbtn').hide();

    });

    $('body').on('click', '#editwinery', function(){
        let wineryid = $(this).attr("data")
        console.log(wineryid);
        getwinerydata(wineryid);
        SubmitEditWinery(wineryid);
    });


    $('body').on('click','#reload-page',function(){
        location.reload();        
    });

    $('#editmodal').on('hidden.bs.modal', function () {
        $(this).find('form').trigger('reset'); 
    });
    $('#editwineriesmodal').on('hidden.bs.modal', function () {
        $(this).find('form').trigger('reset'); 
    });
    $('#editbookingsmodal').on('hidden.bs.modal', function () {
        $(this).find('#bookinglistdata').html("");
    });


//###### Editing Wineries ###########//

    function getwinerydata(id){
    $.get("/api/winerydata/" + id,function(data){
        console.log(data)
        modal_winery_edit(data);
        $('#editwineriesmodal').modal("show");
        $('#addwineriesmodalbtn').hide();
        $('#editwineriesmodalbtn').show();
        
    })
    };

    function modal_winery_edit(data){

        $('#wineryname-input').val(data[0].wineryname);
        $('#wineaddress-input').val(data[0].wineaddress);
        $('#winepostcode-input').val(data[0].winepostcode);
        $('#winephone-input').val(data[0].winephone);
        $('#wineemail-input').val(data[0].wineemail);
        $('#wineryimage-input').val(data[0].wineryimage);
        $('#winerydesc-input').val(data[0].winerydesc);
        $('#wineriesmodalheader').text("Edit Winery");

    };

    function SubmitEditWinery(id){
        $('body').on('click', '#editwineriesmodalbtn', function(){
            const editwineriesData = {
                name: $('#wineryname-input').val().trim(),
                address: $('#wineaddress-input').val().trim(),
                postcode: $('#winepostcode-input').val().trim(),
                phone: $('#winephone-input').val().trim(),
                email: $('#wineemail-input').val().trim(),
                wineryimage: $('#wineryimage-input').val().trim(),
            };
            editwinery(editwineriesData, id);

            $('#editwineriesmodal').modal('hide');
            window.location.reload();
        })
    }

    //###### Editing Wineries ###########//

    //###### Editing & Deleting Wine ############//

    // This only change name
    // $(document).on('click','.winetable',function(event){
    //     $(this).attr('contenteditable', 'true');
    //     $(this).css('background-color', "white");
    //     let x = $(this).attr("id")
    //     console.log(x)
    //     getwinesdata(x);
    // });
    // This only change name

    // This work with code above to lauch ajax call
//     $(document).on('blur','.winetable',function(){
//         let newtext = $(this).text();
//         let id = $(this).attr("id");
//         console.log(newtext, id)
//         const wineedit = {
//             name: newtext,
//             id: id
//         };
//         editwine(wineedit);
//         $(this).css('background-color', "#dfd4d4")

//     });
// This work with code above to lauch ajax call



    $('body').on('click', '#editwine', function(){
        let x = $(this).attr("data")
        getwinesdata(x);
        SubmitEditWine(x);
    })

    function getwinesdata(id){
        $.get("/api/winesdata/" + id,function(data){
            console.log(data)
            modal_wine_edit(data);
            $('#editmodal').modal("show");
            $('#addwinemodalbtn').hide();
            $('#editwinemodalbtn').show();
            
        })
    };

    function modal_wine_edit(data){
        $('#winename-input').val(`${data[0].winename}`);
        $('#winevariety-input').val(`${data[0].variety}`);
        $('#wineyear-input').val(`${data[0].year}`);
        $('#wineimage-input').val(`${data[0].wineimage}`);
        $('#winedescription-input').val(`${data[0].description}`);
        $('#wineprice-input').val(`${data[0].price}`);
        $('#winemodalheader').text("Edit Wine");
        $('#winemodalbtn').text("Edit Wine");

    };


    function SubmitEditWine(id){

        $('body').on('click','#editwinemodalbtn', function(){
            
            const editwineData = {
                name: $('#winename-input').val().trim(),
                variety: $('#winevariety-input').val().trim(),
                year: $('#wineyear-input').val().trim(),
                wineimage: $('#wineimage-input').val().trim(),
                description: $('#winedescription-input').val().trim(),
                price: $('#wineprice-input').val().trim(),
            };
    
            console.log(editwineData, id);
            
            editwine(editwineData,id);
    
            $('#editmodal').modal("hide");
            window.location.reload();
        });

    }
    

    $(document).on('click', '.delwine', function(){
        let x = $(this).attr("id");
        
        deletewine(x);

    })

    //###### Editing & Deleting Wine ############//    

    //###### Editing & Deleting Event ############//

    
    $('body').on('click','.winery-event',function(){
        let wineryID = ($(this).attr("data"));
        $('#editeventsmodal').modal('show');
        $('#eventsmodalheader').text("Add Event")
        $('#addeventsmodalbtn').show();
        $('#editeventsmodalbtn').hide();

        eventSubmit(wineryID);
    });
    
    $(document).on('click', '.delevent', function(){
        let x = $(this).attr("id");
        uncurrentvent(x);
        
        // deleteevent(x);
    });

    $('body').on('click', '#editevent', function(){
        let x = $(this).attr("data")
        geteventdata(x);
        SubmitEditEvent(x)
        

    });


    function geteventdata(id){
        $.get("/api/eventdata/" + id,function(data){
            console.log(data)
            modal_event_edit(data);
            $('#editeventsmodal').modal("show");
            $('#addeventsmodalbtn').hide();
            $('#editeventsmodalbtn').show();
            
        });
    };

    function modal_event_edit(data){
        $('#eventname-input').val(`${data[0].eventname}`);
        $('#eventtime-input').val(`${data[0].time}`);
        $('#eventdate-input').val(`${data[0].date}`);
        $('#eventcap-input').val(`${data[0].capacity}`);
        $('#eventdesc-input').val(`${data[0].desc}`);
        $('#eventsmodalheader').text("Edit Event");
    };

    function SubmitEditEvent(id){
        $('body').on('click', '#editeventsmodalbtn', function(){
            const eventData = {
                eventname: $('#eventname-input').val().trim(),
                time: $('#eventtime-input').val().trim(),
                date: $('#eventdate-input').val().trim(),
                capacity: $('#eventcap-input').val().trim(),
                desc: $('#eventdesc-input').val().trim(),
                wineryid: id,
            }
            editevent(eventData, id);

            $('#editeventsmodal').modal('hide');
            window.location.reload();
        })
    }
    


    //###### Editing & Deleting Event ############//

    //###### View Booking ############//

    $('body').on('click', '#bookingevent', function(){
        let eventid = $(this).attr('data')
        console.log(eventid);
        eventbooking(eventid);
        $('#editbookingsmodal').modal("show")
        
        
    });

    $('body').on('click', "#rmbooking", function(){
        let bookingid = $(this).attr('data');
        console.log(bookingid);
        cancellation(bookingid);
    })

    function eventbooking(id){
        $.get("/api/eventbookings/" + id, function(data){
            console.log(data)
            let sum = 0



            data.forEach(element => {
                let x = parseInt(element.numberbooked)
                sum += x
                const bookingsdata = renderbookinglist(element);
                $('#bookinglistdata').append(bookingsdata);
                return sum
            });
            $('#totalbooked').text(sum)
        })
    }

    function renderbookinglist(data){
        const block = `
        <tr>
        <td>${data.User.email}</td>
        <td>${data.numberbooked}</td>
        <td><button class='btn btn-secondary' id='rmbooking' data=${data.id}>Remove</button>
        </tr>
        `
        return block
    }

    function cancellation(id){
        $.ajax({
            method: "DELETE",
            url: "/api/bookingscancel/" + id
        }).then(function(result){
            $('#editbookingsmodal').modal("hide")
        })
    };


    //###### View Booking ############//

    //###### Wineries Create ############//

    $.get("/api/user_data").then(function (data) {
        $(".member-name").text(data.user);
        $('.memberid').text(data.id);
        memberid = data.id

        return memberid;
    }).then(function (memberid) {


        $('form.addwinery').on('submit', function (event) {
            event.preventDefault();
            const wineryData = {
                wineryname: $('#wineryname-input').val().trim(),
                wineryaddress: $('#wineaddress-input').val().trim(),
                winerypostcode: $('#winepostcode-input').val().trim(),
                wineryphone: $('#winephone-input').val().trim(),
                wineryemail: $('#wineemail-input').val().trim(),
                wineryimage: $('#wineryimage-input').val().trim(),
                winerydesc: $('#winerydesc-input').val().trim(),
                userid: memberid,
            }
            console.log(wineryData);
            addwinery(wineryData.wineryname, wineryData.wineryaddress, wineryData.winerypostcode, wineryData.wineryphone, wineryData.wineryemail, wineryData.wineryimage,wineryData.winerydesc ,wineryData.userid)

        });

        getwineries(memberid)

    })

    function addwinery(name, address, postcode, phone, email, image, desc, id) {
        $.post("/api/addwinery", {
            wineryname: name,
            wineaddress: address,
            winepostcode: postcode,
            winephone: phone,
            wineemail: email,
            wineryimage: image,
            winerydesc: desc,
            FK_Userid: id,
        }).then(function (data) {
            console.log(data)
            window.location.reload();
        }).catch(handleLoginErr);
    };

    function handleLoginErr(err) {
        console.log(err.responseJSON.errors[0].message)
        // $("#alert .msg").text(err.responseJSON.errors[0].message);
        // $("#alert").fadeIn(500);
    };


    function getwineries(id) {
        $.get("/api/wineries_data/" + id, function (data) {
            console.log(data)
        }).then(function (data) {
            data.forEach(element => {
                getwines(element.id);
                getevents(element.id);
                const wineries = renderwineries(element);                
                $('#wineries').append(wineries)       
            });
        })
    };

    //Function to get all wines from the database for each winery under the user account.
    //Render all of the wines to the winery card.
    function getwines(id){
        $.get("/api/wines/" + id,function(data){

            data.forEach(element =>{
                const tablerow = $("<tr class='winerow'>") ;
                tablerow.html(`
                <td><img class="image-fluid" src=${element.wineimage} style="max-height:100px;"></td>
                <td class="winetable" id=${element.id} contenteditable="false">
                <div>${element.winename}</div>
                <div>${element.description}</div>
                </td>
                <td>${element.variety}</td>
                <td>${element.year}</td>
                <td>$ ${element.price}</td>
                <td>
                <span>
                <button class="btn btn-secondary editwine" id="editwine" data=${element.id}>Edit</button>
                <button class="btn btn-secondary delwine" id=${element.id}>Delete</button>
                </span>
                </td>`);
                $('#winery' + id).append(tablerow);
            })

        })
    }

    function getevents(id){
        $.get("/api/events/" + id,function(data){
            data.forEach(element =>{

                const tablerow = $("<tr>") ;
                tablerow.html(`
                <td id=${element.id} contenteditable="false">
                <div>${element.eventname}</div>
                <div>${element.desc}</div>
                </td>
                <td>${element.time}</td>
                <td>${element.date}</td>
                <td>${element.capacity}</td>
                <td>
                <span>
                <button class="btn btn-secondary editevent" id="editevent" data=${element.id}>Edit</button>
                <button class="btn btn-secondary bookingevent" id="bookingevent" data=${element.id}>Bookings</button>
                <a href="/bookings/${element.id}" style="display:none;"<button class="btn btn-secondary bookingevent" id="bookingevent" data=${element.id}>LBookings</button></a>
                <button class="btn btn-secondary delevent" id=${element.id}>Delete</button>
                </span>
                </td>`);
                $('#eventsByWinery' + id).append(tablerow);


            })
        })
    }


    function renderwineries(data) {
        const block = `<div class="card border-dark mb-3">
                <div class="row">
                <div class="col-8">
                <div class="card-header fblack bgwhite">${data.wineryname}</div>
                </div>
        
                <div class="col-4">
                <div class="container d-flex bgwhite">
                <button class="btn btn-outline-dark my-3 ml-auto" id="editwinery" data=${data.id}>Edit Winery</button>
                </div>
                
                </div>
                </div>
    
               <div class="card-body text-dark">                    
                    <div class="row">
                        <div class="col-sm-12 col-md-3 mb-3" >
                            <h5 class="card-title" data=${data.id}>${data.wineryname}</h5>
                            <p class="card-text">Address: ${data.wineaddress}</p>
                            <p class="card-text">Email: ${data.wineemail}</p>
                            <p class="card-text">Phone: ${data.winephone}</p>
                            <img src="${data.wineryimage}" class="img-thumbnail" alt="winery image">
                            <div class="card-text mt-2">Description</div>
                            <p class="card-text">${data.winerydesc}</p>
                            <button type="submit" class="btn btn-primary wine-input mt-2" data=${data.id}>Add Wine</button>
                            <button type="submit" class="btn btn-primary winery-event mt-2" data=${data.id}>Add Event</button>
                        </div>
                        <div class="col-sm-12 col-md-9"">
                        <div class="row">
                        <div class="table-responsive">
                        <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th style="width:10%">Wine Image</th>
                                <th style="width:30%">Wine Name</th>
                                <th style="width:10%">Variety</th>
                                <th style="width:10%">Year</th>
                                <th style="width:10%">Price</th>
                                <th style="width:20%" class="algcen">Options</th>
                            </tr>
                        </thead>
                        <tbody id="winery${data.id}">
                        </tbody>
                        </table>
                        </div>                  
                        </div>
                        <div class="row mt-3">
                        <div class="table-responsive">
                        <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th style="width:25%">Event Name</th>
                                <th style="width:10%">Time</th>
                                <th style="width:15%">Date</th>
                                <th style="width:10%">Capacity</th>
                                <th style="width:30%" class="algcen">Options</th>
                            </tr>
                        </thead>
                        <tbody id="eventsByWinery${data.id}"">
                        </tbody>
                        </table>
                        </div>
                        </div>


                        </div>
                    </div>
                </div>
             </div>`
        return block
    }
    


   //Function for submitting a wine and calling the API. Passing in the winery id as a parameter.
   function wineSubmit(winery){
    $('form.addwine').on('submit', function(event){
        event.preventDefault();
        const wineData = {
            winename: $('#winename-input').val().trim(),
            winevariety: $('#winevariety-input').val().trim(),
            wineyear: $('#wineyear-input').val().trim(),
            wineimage: $('#wineimage-input').val().trim(),
            winedescription: $('#winedescription-input').val().trim(),
            wineprice: $('#wineprice-input').val().trim(),
            wineryid: winery,
        }

        console.log(wineData);
        
        addwine(wineData.winename,wineData.winevariety,wineData.wineyear,wineData.wineimage ,wineData.winedescription,wineData.wineprice,wineData.wineryid);
        $('#editmodal').modal("hide");

    })
}

    //function to post wine to the database via /api/addwine route
    
    function addwine(name,variety,year,image,description,price,id){
        console.log("Wine Submitted");
        $.post("/api/addwine/", {
            winename:name,
            variety:variety,
            year:year,
            wineimage:image,
            description: description,
            price: price,
            WineryId: id,
        }).then(function(data){
            console.log(data)
            window.location.reload();
        }).catch(function(){
            console.log("API failure")
        });
    };
    

    function eventSubmit(winery){
        $('form.addevent').on('submit', function(event){
        event.preventDefault();
        const eventData = {
            eventname: $('#eventname-input').val().trim(),
            time: $('#eventtime-input').val().trim(),
            date: $('#eventdate-input').val().trim(),
            capacity: $('#eventcap-input').val().trim(),
            desc: $('#eventdesc-input').val().trim(),
            wineryid: winery,
        }
        console.log(eventData);

        addevent(eventData.eventname,eventData.time,eventData.date,eventData.capacity, eventData.desc,eventData.wineryid)
        //$('#eventname-input').val("");
        //$('#eventtime-input').val("");
        //$('#eventdate-input').val("");

        // $('#event-modal')[0].style.display = "none";

        }) 
    }       



    function addevent(name,time,date,cap,desc,id){
        console.log("Event Submitted");
            $.post("/api/addEvent/", {
            eventname:name,
            time:time,
            date:date,
            capacity: cap,
            desc: desc,
            WineryId: id,
        }).then(function(data){
            console.log(data)
            window.location.reload();
        }).catch(function(){
            console.log("API failure")
        });
    };
    
//####### Edit winerie ###########//

function editwinery(data, id){
    $.ajax({
        method: "PUT",
        url:"/api/winery/" + id,
        data: data
    }).then(function(result){
        console.log(result)
    }).catch(function(err){
        console.log(err)
    })
};

//####### Edit wines ###########//

    function editwine(data, id){
        $.ajax({
            method: "PUT",
            url:"/api/wine/" + id,
            data: data
        }).then(function(result){
            console.log(result)
        }).catch(function(err){
            console.log(err)
        })
    };

//####### Edit events ###########//

function editevent(data, id){
    $.ajax({
        method: "PUT",
        url:"/api/event/" + id,
        data: data
    }).then(function(result){
        console.log(result)
    }).catch(function(err){
        console.log(err)
    })
};

//####### Delete wines ########//

    function deletewine(id){
        $.ajax({
            method: "DELETE",
            url: "/api/wine/" + id
        }).then(function(result){
            window.location.reload();
        })

    }
//####### Delete events ########//

    function deleteevent(id){
        $.ajax({
            method: "DELETE",
            url: "/api/event/" + id
        }).then(function(result){
            window.location.reload();
        })
    };

    function uncurrentvent(id){
        $.ajax({
            method: "PUT",
            url: "/api/eventdelete/" + id
        }).then(function(result){
            window.location.reload()
        })
    }
});