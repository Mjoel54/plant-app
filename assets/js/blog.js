const plantForum = document.getElementById("plantForum");

// TODO: Create a variable that selects the main element, and a variable that selects the back button element
// let mainEl = document.querySelector("main");
// let backBtnEl = document.getElementById("back");
// let ulEl = document.getElementsByTagName("ul");

// TODO: Create a function that builds an element and appends it to the DOM
const addElementToForum = (obj) => {
  let newElement = document.createElement("article");

  let tipData = JSON.parse(localStorage.getItem("growingTips-1"));
  let plantData = JSON.parse(localStorage.getItem("plantData"));

  if (tipData) {
    console.log(`Successful retrieval: ${tipData}`);
  } else {
    console.log("Failed to retrieve data");
  }

  for (let tip of tipData) {
  }

  newElement.innerHTML = `
<div class="card m-4">
  <div class="card-header">
    Featured
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">${tipData.join(", ")}</p>
  </div>
</div>
    `;
  plantForum.appendChild(newElement);
};

// TODO: Create a function that handles the case where there are no blog posts to display
const noBlogs = (key) => {
  if (!localStorage.getItem(key)) {
    window.alert("There are no blogs to display");
  }
};

// TODO: Create a function called `renderBlogList` that renders the list of blog posts if they exist. If not, call the no posts function.
const renderPlantForumTips = (key) => {
  let retrievedData = JSON.parse(localStorage.getItem(key));
  if (retrievedData) {
    for (let post of retrievedData) {
      addElementToForum(post);
    }
  } else {
    noBlogs();
  }
};

// TODO: Call the `renderBlogList` function
renderPlantForumTips("growingTips-1");

// TODO: Redirect to the home page using the `redirectPage` function found in logic.js when the back button is clicked
backBtnEl.addEventListener("click", () => {
  redirectPage("index.html");
});

document.addEventListener("DOMContentLoaded", (event) => {
  event.stopPropagation();
  addElementToForum();
});
