const blogListEl = document.getElementById("blogListEl");

console.log(blogListEl);

let growingTipsOne = localStorage.getItem("growingTips-1");
console.log(growingTipsOne);

//Function to display tips from storage
const addTipsToPage = (key, number) => {
  let data = retrieveData(key);
  let headingData = retrieveData(`plantData`);
  console.log(headingData);
  let ul = document.createElement("ul");
  ul.setAttribute("class", "list-group");
  data.forEach((tip) => {
    const liEl = document.createElement("li");
    liEl.textContent = tip;
    liEl.setAttribute("class", "list-group-item");
    ul.appendChild(liEl);
  });
  console.log(ul);
  let newTipArticle = document.createElement("article");
  newTipArticle.setAttribute(
    "class",
    "flex-fill col-12 col-md-6 text-center col-lg-4"
  );
  newTipArticle.innerHTML = `
  <div class="card m-4">
  <h2 class="card-header" style="background-color: #008000; color: #e6ffe6; font-size: 18px;">${headingData.data[number].common_name}</h5>
  <div class="card-body p-0">

${ul.outerHTML}
  </div>
</div>`;
  blogListEl.appendChild(newTipArticle);
};

for (let i = 1; i <= 6; i++) {
  if (retrieveData(`growingTips-${i}`)) {
    addTipsToPage(`growingTips-${i}`, i);
  }
}
