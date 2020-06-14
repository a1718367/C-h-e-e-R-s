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
    $('#editeventssmodal').on('hidden.bs.modal', function () {
        $(this).find('form').trigger('reset'); 
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
        $('#eventsmodalheader').text("Edit Event");
    };

    function SubmitEditEvent(id){
        $('body').on('click', '#editeventsmodalbtn', function(){
            const eventData = {
                eventname: $('#eventname-input').val().trim(),
                time: $('#eventtime-input').val().trim(),
                date: $('#eventdate-input').val().trim(),
                capacity: $('#eventcap-input').val().trim(),
                wineryid: id,
            }
            editevent(eventData, id);

            $('#editeventsmodal').modal('hide');
            window.location.reload();
        })
    }
    


    //###### Editing & Deleting Event ############//

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
                userid: memberid,
            }
            console.log(wineryData);
            addwinery(wineryData.wineryname, wineryData.wineryaddress, wineryData.winerypostcode, wineryData.wineryphone, wineryData.wineryemail, wineryData.userid)
            wname.val("");
            waddress.val("");
            wpostcode.val("");
            wphone.val("");
            wemail.val("");
        });

        getwineries(memberid)

    })

    function addwinery(name, address, postcode, phone, email, id) {
        $.post("/api/addwinery", {
            wineryname: name,
            wineaddress: address,
            winepostcode: postcode,
            winephone: phone,
            wineemail: email,
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
                <td class="winetable" id=${element.id} contenteditable="false">${element.winename}</td>
                <td>${element.variety}</td>
                <td>${element.year}</td>
                <td>${element.price}</td>
                <td>
                <span>
                <button class="editwine" id="editwine" data=${element.id}>Edit</button>
                <button class="delwine" id=${element.id}>Delete</button>
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
                <td id=${element.id} contenteditable="false">${element.eventname}</td>
                <td>${element.time}</td>
                <td>${element.date}</td>
                <td>${element.capacity}</td>
                <td>
                <span>
                <button class="editevent" id="editevent" data=${element.id}>Edit</button>
                <button class="bookingevent" id="bookingevent" data=${element.id}>Bookings</button>
                <button class="delevent" id=${element.id}>Delete</button>
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
                <div class="card-header">${data.wineryname}</div>
                </div>
        
                <div class="col-4">
                <div class="container d-flex">
                <button class="btn btn-outline-dark my-3 ml-auto" id="editwinery" data=${data.id}>Edit Winery</button>
                </div>
                
                </div>
                </div>
    
               <div class="card-body text-dark">                    
                    <div class="row">
                        <div class="col-sm-12 col-md-4 mb-3" >
                            <h5 class="card-title" data=${data.id}>${data.wineryname}</h5>
                            <p class="card-text">Address: ${data.wineaddress}</p>
                            <p class="card-text">Email: ${data.wineemail}</p>
                            <p class="card-text">Phone: ${data.winephone}</p>
                            <button type="submit" class="btn btn-primary wine-input mt-2" data=${data.id}>Add a wine</button>
                            <button type="submit" class="btn btn-primary winery-event mt-2" data=${data.id}>Add a calendar event</button>
                        </div>
                        <div class="col-sm-12 col-md-8"">
                        <div class="row">
                        <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Wine Name</th>
                                <th scope="col">Variety</th>
                                <th scope="col">Year</th>
                                <th scope="col">Price</th>
                                <th scope="col">Options</th>
                            </tr>
                        </thead>
                        <tbody id="winery${data.id}">
                        </tbody>
                        </table>                        
                        </div>
                        <div class="row">
                        <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Event Name</th>
                                <th scope="col">Time</th>
                                <th scope="col">Date</th>
                                <th scope="col">Capacity</th>
                                <th scope="col">Options</th>
                            </tr>
                        </thead>
                        <tbody id="eventsByWinery${data.id}"">
                        </tbody>
                        </table>
                        
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
            winedescription: $('#winedescription-input').val().trim(),
            wineprice: $('#wineprice-input').val().trim(),
            wineryid: winery,
        }

        console.log(wineData);
        
        addwine(wineData.winename,wineData.winevariety,wineData.wineyear,wineData.winedescription,wineData.wineprice,wineData.wineryid);
        $('#editmodal').modal("hide");

    })
}

    //function to post wine to the database via /api/addwine route
    
    function addwine(name,variety,year,description,price,id){
        console.log("Wine Submitted");
        $.post("/api/addwine/", {
            winename:name,
            variety:variety,
            year:year,
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
            wineryid: winery,
        }
        console.log(eventData);

        addevent(eventData.eventname,eventData.time,eventData.date,eventData.capacity,eventData.wineryid)
        //$('#eventname-input').val("");
        //$('#eventtime-input').val("");
        //$('#eventdate-input').val("");

        // $('#event-modal')[0].style.display = "none";

        }) 
    }       



    function addevent(name,time,date,cap,id){
        console.log("Event Submitted");
            $.post("/api/addEvent/", {
            eventname:name,
            time:time,
            date:date,
            capacity: cap,
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