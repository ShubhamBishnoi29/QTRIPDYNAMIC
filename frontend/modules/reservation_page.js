import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let url = config.backendEndpoint + "/reservations/"
    let data = await fetch(url);
    let json_data = await data.json();
    return json_data;
  } catch(err){
    return null;
  }

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  const isEmpty = Object.keys(reservations).length === 0;
  if(isEmpty){
    document.getElementById('reservation-table-parent').style.display = 'none';
    document.getElementById('no-reservation-banner').style.display = 'block';
  }else{
    document.getElementById('reservation-table-parent').style.display = 'block';
    document.getElementById('no-reservation-banner').style.display = 'none';
  }

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

    const reservationTable = document.getElementById('reservation-table');

    reservations.map((key) => {
      let resDate = new Date(key.date).toLocaleDateString("en-IN");
      let bookingTime = new Date(key.time);
      let bookingTimeFormat = bookingTime.toLocaleString("en-IN", {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      })

      let newElement = document.createElement('tr');
      // newElement.style.verticalAlign = "middle";
      newElement.innerHTML = `
        <td data-label="Transaction ID"><b>${key.id}</b></td>
        <td data-label="Booking Name">${key.name}</td>
        <td data-label="Adventure">${key.adventureName}</td>
        <td data-label="Person(s)">${key.person}</td>
        <td data-label="Date">${resDate}</td>
        <td data-label="Price">${key.price}</td>
        <td data-label="Booking Time">${bookingTimeFormat}</td>
        <td data-label="Action" class="td_action">
          <div class="reservation-visit-button" id=${key.id}>
            <a href="../detail/?adventure=${key.adventure}">Visit Adventure</a>
          </div>
        </td>
      `;
      

      reservationTable.appendChild(newElement);
    });

}

export { fetchReservations, addReservationToTable };
