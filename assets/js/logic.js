const plantAppKey = "sk-JE7J66f392518002d6994";
const mainEl = document.getElementsByTagName("main")[0];
const plantCardListEl = document.getElementById("plantCardList");
let storedData = retrieveData(`plantData`);

// Fetch Data from the API
async function fetchPlantData() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  try {
    const response = await fetch(
      `https://perenual.com/api/species-list?key=${plantAppKey}`,
      requestOptions
    );

    console.log("Raw response:", response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Parsed data:", data);

    storeData(`plantData`, data);
  } catch (error) {
    console.log("Error fetching plant data:", error);
  }
}

function storeData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  console.log(`Data stored in localStorage with key ${key}.`);
}

function retrieveData(key) {
  const data = localStorage.getItem(key);
  if (data) {
    console.log(`Data retrieved from localStorage with key ${key}.`);
    return JSON.parse(data);
  } else {
    console.log(`No data found in localStorage with key ${key}.`);
    return null;
  }
}

const redirectPage = (url) => {
  if (url) {
    location.assign(url);
  } else {
    console.log("Page redirect failed");
  }
};

const renderCardEl = () => {
  let testData = retrieveData("plantData");
  console.log(testData.data[0]);

  for (let i = 0; i < 6; i++) {
    let newElement = document.createElement("div");
    newElement.setAttribute("class", "card col-md-3 col-12 m-4 shadow-sm");
    newElement.setAttribute("style", "width: 18rem; padding: 0;");
    newElement.setAttribute("id", `plantID-${testData.data[i].id}`);

    if (testData) {
      newElement.innerHTML = `
        <img src="${
          testData.data[i].default_image.medium_url
        }" class="card-img-top w-100" alt="${testData.data[i].common_name}" />

        <div class="card-body">
          <h5 class="card-title text-center">${
            testData.data[i].common_name
          }</h5>
          <p class="card-text text-center text-muted small"><em>${
            testData.data[i].scientific_name
          }</em></p>
          <p class="card-text text-center text-muted">Watering: ${
            testData.data[i].watering
          }</p>
          <p class="card-text text-center text-muted mb-0">Sunlight: ${testData.data[
            i
          ].sunlight.join(", ")}</p><div class="mt-auto">
               <form id="tipsInputContainer-${
                 testData.data[i].id
               }" class="mt-3"><hr />
            <input type="text" id="growingTipsInput-${
              testData.data[i].id
            }" class="form-control" placeholder="Add gardening tips"/>
            <div class="justify-content-center">
            <button id="saveTipsBtn-${
              testData.data[i].id
            }" class="btn btn-secondary mt-3">Save</button></div>
          </form></div>
        </div>

        <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModal-${testData.data[i].id}"
          tabindex="-1"
          aria-labelledby="exampleModalLabel-${testData.data[i].id}"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel-${
                  testData.data[i].id
                }">
                  Thank you for providing your plant care tips!
                </h5>
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
       <img
              src="./Screenshot 2024-10-01 193713.png"
              alt="Plant Image"
              class="img-fluid mb-3"
            />
               
              </div>

            </div>
          </div>
        </div>
      `;

      plantCardListEl.appendChild(newElement);

      // Get elements by ID
      const tipsInputContainer = document.getElementById(
        `tipsInputContainer-${testData.data[i].id}`
      );

      const growingTipsInput = document.getElementById(
        `growingTipsInput-${testData.data[i].id}`
      );
      const saveTipsBtn = document.getElementById(
        `saveTipsBtn-${testData.data[i].id}`
      );

      saveTipsBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        event.stopPropagation(); // Stop the event from bubbling up

        const tips = growingTipsInput.value;
        if (tips) {
          const plantID = testData.data[i].id;
          storeTips(plantID, tips);
          // Show the modal
          const modal = new bootstrap.Modal(
            document.getElementById(`exampleModal-${plantID}`)
          );
          modal.show();
        } else {
          alert("Please enter a tip before saving!");
        }
      });
    } else {
      console.log("Data not found");
    }
  }
};

// Function to store growing tips in localStrage
const storeTips = (plantID, tips) => {
  const existingTips = retrieveData(`growingTips-${plantID}`) || [];
  existingTips.push(tips);
  localStorage.setItem(`growingTips-${plantID}`, JSON.stringify(existingTips));
  console.log(`Growing tips for plant ${plantID} saved.`);
};

renderCardEl();
