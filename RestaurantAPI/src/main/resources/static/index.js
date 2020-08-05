function initialize(){
    getRestaurants("/api/restaurants");  // only need partial URL from inside static folder
    renderModal("createRestaurant", -1);
}

function getRestaurants(url){

    var xhttpList = new XMLHttpRequest();

    xhttpList.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            renderManyRestaurants(this.responseText);
        }
    };
    xhttpList.open("GET", url, true);
    xhttpList.send();
    console.log("Restaurants received");  
}

function getRestaurantsThatDeliver(){

    var display = document.getElementById("restaurants");
    display.innerHTML = '';
    getRestaurants("/api/restaurants/delivery");
}

function getRestaurantsWithOutdoorSeating(){

    var display = document.getElementById("restaurants");
    display.innerHTML = '';
    getRestaurants("/api/restaurants/outdoor");
}

// this is for updating restaurants
function getRestaurantById(id){

    var url = "/api/restaurants/" + id;
    var xhttpList = new XMLHttpRequest();
    var restaurant;

    xhttpList.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            sessionStorage.setItem("restaurant", this.responseText);
        }
    };
    xhttpList.open("GET", url, false);
    xhttpList.send();
    console.log("Restaurant received");  

    return sessionStorage.getItem("restaurant");
}

function renderRestaurant(json){

    var cardHtml = 
    `<div id="${json.id}"class="card" height="180">
        <img class="card-img-top" src= ${json.imageURL} alt="Card image" style="width:100%" height="50%">
        <div class="card-body"> 
            <h4 class="card-title">${json.name}</h4>
            <p class="card-text">${json.name} is in the ${json.neighborhood} neighborhood</p>
            <a href="#" id ="btnUpdate" class="btn btn-primary" onclick="renderModal('updateRestaurant', ${json.id})" data-toggle="modal" data-target="#updateRestaurant">UPDATE</a>
            <a href="#" id="btnDelete" class="btn btn-secondary" onclick="deleteRestaurant(${json.id})">DELETE</a>
        </div>
    </div>`;

    //document.getElementById("restaurants").insertAdjacentHTML('beforeend', cardHtml);
    return cardHtml;

}

function renderManyRestaurants(data){

    var jsonArray = JSON.parse(data);
    console.log(jsonArray);
    for(var index = 0; index < jsonArray.length; index++){
        // loop through json array and call renderRestaurant on each object to make a card
        // append cards to card decks
        let json = jsonArray[index];
         // create card Deck
        var card = renderRestaurant(json);
        var cardDeck;
       
        if(index  == 0 || index % 3 == 0){
            cardDeck = document.createElement("div");
            cardDeck.classList.add("card-deck");
            cardDeck.style.width = "85%";
        }

        cardDeck.innerHTML += card;
        document.getElementById("restaurants").appendChild(cardDeck);
    }

     // From Matt: Once the student cards are created and rendered on our page, we can then find them 
     // and add on the update buttons with associated modals
     // TODO: I added the ids to the buttons with each card...will it still work?
     // Trying to render it with onclick of update button
    // renderModal("updateRestaurant", "Update a Restaurant");
}

function renderModal(modalPurpose, id){

     //reset modal div every time so don't have to store mult modals in HTML
    document.getElementById("modals").innerHTML = "";

    var modalTitle;

    if(modalPurpose == "updateRestaurant"){
        modalTitle = "Update Restaurant";
    }else{
        modalTitle = "Add a Restaurant";
    }
   
   var modalHTML = 
   
   // I think adding id to id will fix issue with update modal retaining values
  
    `<div class="modal fade" id="${modalPurpose}">

        <div class="modal-dialog modal-xl">
        
            <div class="modal-content">
            
                <div class="modal-header">
                    <h4 class="modal-title">${modalTitle}</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                
                <div class="modal-body">
                    ${renderModalBody(modalPurpose, id)}
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="createOrUpdateRestaurant('${modalPurpose}', '${id}')">Save</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>

            </div>

        </div>

    </div`;

    document.getElementById("modals").insertAdjacentHTML('beforeend', modalHTML);

}

function renderModalBody(modalPurpose, id){

    var name = "";
    var address = "";
    var city = "";
    var state = "";
    var zip = "";
    var neighborhood = "";
    var delivery = "";
    var outdoorSeating = "";
    var imageURL = "";

    if(id != -1){
        restaurant = getRestaurantById(id);
        input = JSON.parse(restaurant);
        restaurantID = input.id;
        name = input.name;
        address = input.address;
        city = input.city;
        state = input.state;
        zip = input.zip;
        neighborhood = input.neighborhood;
        delivery = input.delivery;
        outdoorSeating = input.delivery;
        imageURL = input.imageURL;
    }

    // TODO: can change to something like this
    // if id != -1, for each prop in restaurant, renderTextComponent(modalPurpose, prop, value);
    // and if not -1, make an empty JSON obj with all values empty strings?

    var body = 
    `<div class="md-form mb-5">
        <i class="fas fa-user prefix grey-text"></i>
        <input type="text" id="${modalPurpose}-name" class="form-control validate" value="${name}">
        <label data-error="wrong" data-success="right" for="${modalPurpose}-name">Restaurant name</label>
    </div>

    <div class="md-form mb-5">
        <i class="fas fa-user prefix grey-text"></i>
        <input type="text" id="${modalPurpose}-address" class="form-control validate" value="${address}">
        <label data-error="wrong" data-success="right" for="${modalPurpose}-address">Restaurant address</label>
    </div>

    <div class="md-form mb-5">
        <i class="fas fa-envelope prefix grey-text"></i>
        <input type="text" id="${modalPurpose}-city" class="form-control validate" value="${city}">
        <label data-error="wrong" data-success="right" for="${modalPurpose}-city">Restaurant city</label>
    </div>

    <div class="md-form mb-5">
        <i class="fas fa-user prefix grey-text"></i>
        <input type="text" id="${modalPurpose}-state" class="form-control validate" value="${state}">
        <label data-error="wrong" data-success="right" for="${modalPurpose}-state">Restaurant state</label>
    </div>

    <div class="md-form mb-5">
        <i class="fas fa-user prefix grey-text"></i>
        <input type="text" id="${modalPurpose}-zip" class="form-control validate" value="${zip}">
        <label data-error="wrong" data-success="right" for="${modalPurpose}-zip">Restaurant zip</label>
    </div>

    <div class="md-form mb-5">
        <i class="fas fa-user prefix grey-text"></i>
        <input type="text" id="${modalPurpose}-neighborhood" class="form-control validate" value="${neighborhood}">
        <label data-error="wrong" data-success="right" for="${modalPurpose}-neighborhood">Restaurant Neighborhood</label>
    </div>

    <div class="md-form mb-5">
        <i class="fas fa-user prefix grey-text"></i>
        <input type="text" id="${modalPurpose}-delivery" class="form-control validate" value="${delivery}">
        <label data-error="wrong" data-success="right" for="${modalPurpose}-delivery">Delivery</label>
    </div>

    <div class="md-form mb-5">
        <i class="fas fa-user prefix grey-text"></i>
        <input type="text" id="${modalPurpose}-outdoorSeating" class="form-control validate" value="${outdoorSeating}">
        <label data-error="wrong" data-success="right" for="${modalPurpose}-outdoorSeating">Outdoor Seating</label>
    </div>

    <div class="md-form mb-5">
        <i class="fas fa-user prefix grey-text"></i>
        <input type="text" id="${modalPurpose}-imageURL" class="form-control validate" value="${imageURL}">
        <label data-error="wrong" data-success="right" for="${modalPurpose}-imageURL">Restaurant image URL</label>
    </div>`;

    return body;
}

// use this to to a POST request
function createOrUpdateRestaurant(modalPurpose, id){

    console.log(modalPurpose);
    console.log(`${modalPurpose}-name`);
   var sendData = {
       // like this to get data entered in modal form
       //TODO is this OK for post?
       "id": id,
       "name": document.getElementById(`${modalPurpose}-name`).value,
       "address": document.getElementById(`${modalPurpose}-address`).value,
       "city": document.getElementById(`${modalPurpose}-city`).value,  
       "state": document.getElementById(`${modalPurpose}-state`).value,
       "zip": document.getElementById(`${modalPurpose}-zip`).value,
       "neighborhood": document.getElementById(`${modalPurpose}-neighborhood`).value,
       "delivery": document.getElementById(`${modalPurpose}-delivery`).value,
       "outdoorSeating": document.getElementById(`${modalPurpose}-outdoorSeating`).value,
       "imageURL": document.getElementById(`${modalPurpose}-imageURL`).value
   };
   console.log(sendData);

   if(id != -1){
        var ok = confirm("Are you ready to update?");
        if(ok == true){
            sendPut(sendData);
        }
   }else{
        var ok = confirm("Are you ready to send?");
        if(ok == true){
            sendPost(sendData);
        }
   }
}

function sendPut(sendData){

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/api/update/restaurant", true);
    xhttp.setRequestHeader('content-Type', 'application/json');
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Update success");
            var display = document.getElementById("restaurants");
            display.innerHTML = '';
            getRestaurants("/api/restaurants");
        }
    };
    // Be sure that the JSON student is coverted to String before sending, using JSON.stringify
    xhttp.send(JSON.stringify(sendData));
}

function sendPost(sendData){

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/api/add/restaurant", true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.onreadystatechange = function(){
        // if the POST request went through, all we need to do is update HTML components
        if(this.readyState == 4 && this.status == 200){
            var display = document.getElementById("restaurants");
            display.innerHTML = '';
            getRestaurants("/api/restaurants");
            console.log("Restaurant created!");
        }
    };
    xhttp.send(JSON.stringify(sendData));
}


function deleteRestaurant(id){

    var url = "/api/delete/restaurant/" + id;

    var ok = confirm("Are you sure you want to delete this restaurant?\nPress 'ok' to continue or cancel to abort");

    if(ok == true){
        
        var xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", url, true);

        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                var removeCard = document.getElementById(id);
                removeCard.parentNode.removeChild(removeCard);
                console.log("Restaurant deleted");
            }
        };

        xhttp.send(null);
    }
}




