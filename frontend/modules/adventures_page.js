
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  let city = params.get('city');
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let url = config.backendEndpoint + `/adventures?city=${city}`;
    let data = await fetch(url);
    let json_data = await data.json();
    return json_data;
  } catch(err){
    return null;
  }
}


//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  //Updates the DOM with the Adventure Places
  adventures.forEach((key) => {
    let parentElement = document.getElementById('data');

    let colDiv = document.createElement("div");
    colDiv.classList.add('col-12', 'col-sm-6','col-md-4', 'col-lg-3', 'mb-3','adventure-card');

    let aTag = document.createElement('a');
    
    aTag.setAttribute('href',`./detail/?adventure=${key.id}`);
    aTag.setAttribute("id", key.id);

    let categoryBannerDiv = document.createElement("div");
    categoryBannerDiv.classList.add("category-banner");
    categoryBannerDiv.innerText = key.category;

    let activityCardDiv = document.createElement("div");
    activityCardDiv.classList.add("activity-card");
    
    //adding image
    let img = document.createElement("img");
    img.src = key.image;
    img.alt = key.name;

    let activityCardDescriptionDiv = document.createElement("div");
    activityCardDescriptionDiv.classList.add("activity-card-description");

    let activityName_p = document.createElement("p");
    activityName_p.classList.add("activity-name");
    activityName_p.innerText = key.name;

    let activityCost_p = document.createElement("p");
    activityCost_p.classList.add("activity-cost");
    activityCost_p.innerText = `₹${key.costPerHead}`;

    let activityCardDurationDiv = document.createElement("div");
    activityCardDurationDiv.classList.add("activity-card-duration");

    let activityDuration_p = document.createElement("p");
    activityDuration_p.classList.add("activity-duration");
    activityDuration_p.innerText = "Duration";

    let activityDurationTime_p = document.createElement("p");
    activityDurationTime_p.classList.add("activity-duration-time");
    activityDurationTime_p.innerText = `${key.duration} Hours`;

    //adding to div element
    activityCardDescriptionDiv.append(activityName_p, activityCost_p);
    activityCardDurationDiv.append(activityDuration_p, activityDurationTime_p);
    activityCardDiv.append(img, activityCardDescriptionDiv, activityCardDurationDiv);
    aTag.append(categoryBannerDiv, activityCardDiv);
    colDiv.append(aTag);
    parentElement.append(colDiv);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let sortedDurationList = list.filter(function (value) {
    if(value.duration >= low && value.duration <= high){
      return true;
    }else{
      return false;
    }
  });
  return sortedDurationList;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let sortedCategoryList = list.filter(function (value) {
    return categoryList.includes(value.category);
  });
  return sortedCategoryList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  let sortedList;
  let low;
  let high; 
  if(filters.duration != ''){
    let durationArr = filters.duration.split("-");
    low = durationArr[0];
    high = durationArr[1]; 
  }
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if(filters.category.length != 0 && filters.duration == ''){
    sortedList = filterByCategory(list, filters.category);
  }else if(filters.category.length == 0 && filters.duration != ''){
    sortedList = filterByDuration(list, low, high);
  }else if(filters.category.length != 0 && filters.duration != ''){
    let sortedCatList = filterByCategory(list, filters.category);
    sortedList = filterByDuration(sortedCatList, low, high);
  }else{
    sortedList = list;
  }
  // Place holder for functionality to work in the Stubs

  return sortedList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem('filters', JSON.stringify(filters));
  return true;
} 

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(window.localStorage.getItem('filters'));

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let arrLength = filters.category.length;
  //Iteration over category 
  for (var i = 0; i < arrLength; i++) {
    var catg = filters.category[i];

    //Adding to DOM
    let parentElement = document.getElementById('category-list');
    let divElement = document.createElement('div');
    divElement.classList.add("category-filter");

    let pTag = document.createElement('p');
    pTag.classList.add("category-name");
    pTag.innerHTML = catg;

    divElement.append(pTag);
    parentElement.append(divElement);
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
