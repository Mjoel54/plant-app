const plantAppKey = "sk-JE7J66f392518002d6994";
const mainEl = document.getElementsByTagName("main")[0];
const plantCardListEl = document.getElementById("plantCardList");
let storedData = retrieveData(`plantData`);

//Fetch Data from the API
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

    // Log the response to check if it's valid
    console.log("Raw response:", response);

    // Check if the response is OK (status code 200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Parsed data:", data); // Log the parsed data

    // Now save the data if it's valid
    storeData(`plantData`, data);
  } catch (error) {
    console.log("Error fetching plant data:", error);
  }
}

// TODO: Write a storeData function
function storeData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  console.log(`Data stored in localStorage with key ${key}.`);
}

// TODO: Write a function retrieveData to get Data from local storage
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

// Redirect Page Function
const redirectPage = (url) => {
  if (url) {
    location.assign(url);
  } else {
    console.log("Page redirect failed");
  }
};

// Functioning code
const renderCardEl = () => {
  let testData = retrieveData("plantData");
  console.log(testData.data[0]);

  // Loop through plant data and create a card for each plant
  for (let i = 0; i < 6; i++) {
    let newElement = document.createElement("div");
    newElement.setAttribute("class", "card col-md-3 col-12 m-4 shadow-sm");
    newElement.setAttribute("style", "width: 18rem; padding: 0;");
    newElement.setAttribute("id", `plantID-${testData.data[i].id}`);

    if (testData) {
      // Create the card content
      newElement.innerHTML = `
        <img src="${
          testData.data[i].default_image.medium_url
        }" class="card-img-top w-100" alt="${testData.data[i].common_name}" />

        <div class="card-body d-flex flex-column h-100">
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
          ].sunlight.join(", ")}</p><div mt-auto">
               <form id="tipsInputContainer-${
                 testData.data[i].id
               }" class="mt-3"><hr />
            <input type="text" id="growingTipsInput-${
              testData.data[i].id
            }" class="form-control" placeholder="Add gardening tips"/>
            <div class="d-flex justify-content-center"><button id="saveTipsBtn-${
              testData.data[i].id
            }" class="btn btn-secondary mt-3">Save</button></div>
          </form></div>
        </div>
      `;

      // Append the card to the container
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

      // Add event listener for the "Save Tips" button
      saveTipsBtn.addEventListener("click", () => {
        const tips = growingTipsInput.value;
        if (tips) {
          // Save the tips in localStorage with a uniqe key for each plant
          const plantID = testData.data[i].id;
          storeTips(plantID, tips);
          alert("Growing tips saved!");
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
