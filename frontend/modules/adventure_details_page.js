import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  let adventure = params.get('adventure');
  return adventure;
  // Place holder for functionality to work in the Stubs
  // return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let url = config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`;
    let data = await fetch(url);
    let json_data = await data.json();
    return json_data; 
  } catch(err){
    return null;
  }
  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  
  //adding Heading
  let adventureNameHeading = document.getElementById('adventure-name');
  adventureNameHeading.innerHTML = adventure.name;

  //adding Sub-title
  let adventureSubTitle = document.getElementById('adventure-subtitle');
  adventureSubTitle.innerHTML = adventure.subtitle;

  //adding Images
  let photoGallery = document.getElementById('photo-gallery');
  for(let i = 0; i < adventure.images.length; i++){
    let imgDiv = document.createElement("div");
    let img = document.createElement("img");
    img.classList.add("activity-card-image");
    img.src = adventure.images[i];
    img.alt = adventure.name;
    imgDiv.append(img);
    photoGallery.append(imgDiv);
  }

  //adding Content
  let adventureContent = document.getElementById('adventure-content');
  adventureContent.innerHTML = adventure.content;
  
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  let photoGallery = document.getElementById('photo-gallery');
  photoGallery.innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    
  </div>
  <div class="carousel-inner">

  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;

let carouselIndicators = document.querySelector('.carousel-indicators');
let carouselInner = document.querySelector('.carousel-inner');

for(let i = 0; i < images.length; i++){
  // adding carousel-indicators
  let btn = document.createElement("button");
  btn.type = "button";
  btn.setAttribute("data-bs-target", "#carouselExampleIndicators");
  btn.setAttribute("data-bs-slide-to", `${i}`);
  btn.setAttribute("aria-label", `Slide ${i}`);
  carouselIndicators.append(btn);
  if(i == 0){
    btn.setAttribute("aria-current", "true");
    btn.classList.add('active')
  }

  // adding carousel-inner
  let imgDiv = document.createElement("div");
  i == 0 ? imgDiv.classList.add('carousel-item', 'active') : imgDiv.classList.add('carousel-item');
  let img = document.createElement("img");
  img.classList.add('activity-card-image', 'd-block', 'w-100');
  img.src = images[i];
  imgDiv.append(img);
  carouselInner.append(imgDiv);
}
  

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let soldOutElement = document.getElementById('reservation-panel-sold-out');
  let reservationElement = document.getElementById('reservation-panel-available');
  let costPerHeadElement = document.getElementById('reservation-person-cost');
  costPerHeadElement.innerHTML = adventure.costPerHead;
  if (adventure.available == true) {
    soldOutElement.style.display = 'none';
    reservationElement.style.display = 'block';
  } else {
    reservationElement.style.display = 'none';
    soldOutElement.style.display = 'block';
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let reservationCostElement = document.getElementById('reservation-cost');
  if(persons >= 0){
    let totalCost = (adventure.costPerHead * persons);
    reservationCostElement.innerHTML = totalCost;
  }
  
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  const form = document.getElementById('myForm');
  
  form.addEventListener("submit", async (event) => {
    event.preventDefault();  //stop form from submitting
    let url = config.backendEndpoint + "/reservations/new";
    //do whatever an submit the form
    let formElements = form.elements;

    let payload = {
      name: formElements["name"].value.trim(), 
      date: formElements["date"].value, 
      person: formElements["person"].value, 
      adventure: adventure.id,
    }

    try{
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-type" : "application/json"
        }
      });

      if(res.ok){
        alert("Success!");
        window.location.reload();
      }else{
        alert("Failed!");
      }

    }catch(error){
      alert("Failed-to fetch");
    }

  })

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  console.log("--->", adventure);
  const reservedBannerElement = document.getElementById('reserved-banner');
  if(adventure.reserved){
    reservedBannerElement.style.display = 'block';
  }else{
    reservedBannerElement.style.display = 'none';
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
