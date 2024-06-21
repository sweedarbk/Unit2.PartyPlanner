const baseUrl =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events";
async function logAsync(func) {
  const result = await func();
  console.log(result);
}

const state = {
  events: [],
  messages: 'This object is not in the database!',
  isError: false
};

//get party
async function getParty() {
  const response = await fetch(`${baseUrl}`);
  const json = await response.json();

  if (!json.success) {
    throw new Error(json.error);
  }

  state.events = [...json.data];

  render();
}

// render party to browser
function addPartyToScreen(r) {
  const partiesElement = document.getElementById("parties");
  const elem = document.createElement("div");
  elem.classList.add("party");
  elem.setAttribute("data-id", r.id);

  const idElem = document.createElement("div");
  idElem.classList.add("id");
  idElem.append(r.id);

  const nameElem = document.createElement("div");
  nameElem.classList.add("name");
  nameElem.append(r.name);

  const descriptionElem = document.createElement("div");
  descriptionElem.classList.add("description");
  descriptionElem.append(r.description);

  const dateElem = document.createElement("div");
  dateElem.classList.add("date");
  dateElem.append(r.date);

  const locationElem = document.createElement("div");
  locationElem.classList.add("location");
  locationElem.append(r.location);

  const cohortIdElem = document.createElement("div");
  cohortIdElem.classList.add("cohortId");
  cohortIdElem.append(r.cohortId);

  const delButtonElem = document.createElement("button");
  const buttonText = document.createTextNode("Delete");
  delButtonElem.appendChild(buttonText);

  delButtonElem.addEventListener('click', async (event) => {
    const selectedParty = event.target.closest('.party');
    const id = selectedParty.dataset.id;
    const result = await deleteParty(id);
  })

  elem.append(idElem);
  elem.append(nameElem);
  elem.append(descriptionElem);
  elem.append(dateElem);
  elem.append(locationElem);
  elem.append(cohortIdElem);
  elem.append(delButtonElem);

  partiesElement.append(elem);
}

const form = document.getElementById("partyForm");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const id = document.getElement("id");
  const name = document.getElementById("name");
  const description = document.getElementById("description");
  const date = document.getElementById("date");
  const location = document.getElementById("location");
  const cohortId = document.getElementById("cohortId");

  const party = {
    id: id.value,
    name: name.value,
    description: description.value,
    date: date.value,
    location: location.value,
    cohortId: cohortId.value,
  };

  try {
    const newParty = await createParty(party);
    // add the new recipe to the screen
    addPartyToScreen(newParty);
  } catch (err) {
    console.error(err);
  }
});

function render(){
  state.events.forEach((r) => {
    addPartyToScreen(r);
  });
}

async function init() {
  await getParty();
}

async function deleteParty(id) {
  try {
    const response = await fetch(`${baseUrl}${id}`, {
      method: 'delete',
    });
    if(response.status === 204){
      
    }
  } catch (error) {

  }
}

init();


// Create a party
// async function createParty(party) {
//   const response = await fetch(`${baseUrl}`, {
//       method: 'post',
//       headers: {
//           "Content-Type": "application/json"
//       },
//       body: JSON.stringify(party),
//   });
//   const json = await response.json();

//   if(!json.success) {
//       throw new Error(json.error.message);
//   }

//   return json.data;
// }

// deleting a party
// event listener on click attached to button
// callback function to call an  async function to remove an object from the api
// update DOM if successful
