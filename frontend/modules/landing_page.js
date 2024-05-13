import config from "../conf/index.js";

async function init() {
  console.log("From init()");
  
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let url = config.backendEndpoint + `/cities`;
    let data = await fetch(url)
    let json_data = await data.json();
    return json_data;
  } catch(err){
    // throw new Error(err);
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
    let parentElement = document.getElementById('data'); 
    let divElement = document.createElement("div");
    //  Add multiple classes
    divElement.classList.add('col-12', 'col-sm-6', 'col-lg-3', 'mb-4');
    //Creating a Tag
    let aTag = document.createElement('a');
    aTag.setAttribute('href',`./pages/adventures/?city=${id}`);
    aTag.setAttribute("id", id);

    let titleDiv = document.createElement("div");
    titleDiv.classList.add('tile');
    //adding image
    let img = document.createElement("img");
    img.src = image;

    //adding title description
    let titleTextDiv = document.createElement("div");
    titleTextDiv.classList.add('tile-text', 'text-center', 'text-white');

    //adding city name
    let hElement = document.createElement("h5");
    hElement.innerText = city;
    //adding number of places
    let pElement = document.createElement("p");
    pElement.innerText = description;

    //adding to div element
    titleTextDiv.append(hElement, pElement);
    titleDiv.append(img, titleTextDiv);
    aTag.append(titleDiv);
    divElement.append(aTag);
    parentElement.append(divElement);
}

export { init, fetchCities, addCityToDOM };
