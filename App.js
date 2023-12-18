// Fetching News
const fetchNews = async () => {
  let result = await fetch(
    "https://content.newtonschool.co/v1/pr/64e3d1b73321338e9f18e1a1/inshortsnews"
  );
  let response = await result.json();
  return response;
};

// Getting Categories
const getCategories = async () => {
  const allCategoryInfo = await fetchNews();
  const categoryList = new Set();
  allCategoryInfo.map((item, index) => {
    categoryList.add(item.category);
  });
  const categoryListArray = Array.from(categoryList);
  categoryListArray.unshift("All");
  const selectorContainer = document.getElementById("selection");
  categoryListArray.map((categoryName, index) => {
    const button = document.createElement("button");
    button.classList.add("category");
    button.textContent = categoryName;
    selectorContainer.appendChild(button);
    if (categoryName === "All") button.classList.add("active");
    button.addEventListener("click", () => {
      document.querySelectorAll(".category").forEach((btn) => {
        btn.classList.remove("active");
      });
      button.classList.add("active");
      document.getElementById("allNewsDetails").innerHTML = "";
      displayNews(categoryName);
    });
  });
};
if (document.getElementById("selection")) getCategories();

// Displaying News
async function displayNews(value) {
  const allData = await fetchNews();
  const container = document.getElementById("allNewsDetails");
  const savedNews = getItemsFromLocalStorage();
  allData.map((item, index) => {
    if (value === "All" || value === item.category) {
      const contentContainer = document.createElement("div");
      contentContainer.classList.add("content");
      contentContainer.innerHTML = `
      <div class="main-details">
          <p>by <span>${item.author}</span></p>
          <p>category <span>${item.category}</span></p>
        </div>
        <div class="main-content">
          <p>${item.content} <span>read more....</span></p>
        </div>
        <div class="icon">
          <i class='fa-regular fa-heart fa-icon ${
            savedNews.includes(index + "") ? "fa-solid" : ""
          }' id=${index} onclick="saveToLocal()"></i>
        </div>
      `;
      container.appendChild(contentContainer);
    }
  });
}
if (document.getElementById("allNewsDetails")) displayNews("All");

// Local Storage Functions
function getItemsFromLocalStorage() {
  const savedNews = JSON.parse(localStorage.getItem("content"));
  return savedNews === null ? [] : savedNews;
}

function addItemsToLocalStorage(content) {
  const getSavedContent = getItemsFromLocalStorage();
  localStorage.setItem(
    "content",
    JSON.stringify([...getSavedContent, content])
  );
}

function removeItemsFromLocalStorage(content) {
  const getSavedContent = getItemsFromLocalStorage();
  localStorage.setItem(
    "content",
    JSON.stringify(getSavedContent.filter((value) => value != content))
  );
}

// saveToLocal
function saveToLocal() {
  if (event.target.classList.contains("fa-solid")) {
    removeItemsFromLocalStorage(event.target.id);
    event.target.classList.remove("fa-solid");
  } else {
    addItemsToLocalStorage(event.target.id);
    event.target.classList.add("fa-solid");
  }
}

// Displaying Saved News
async function displaySavedNews() {
  const allData = await fetchNews();
  const container = document.getElementById("savedNews");
  const savedNews = getItemsFromLocalStorage();
  savedNews.forEach((index) => {
    console.log(allData[+index]);
    const contentContainer = document.createElement("div");
    contentContainer.classList.add("content");
    contentContainer.innerHTML = `
    <div class="main-details">
        <p>by <span>${allData[index].author}</span></p>
        <p>category <span>${allData[index].category}</span></p>
      </div>
      <div class="main-content">
        <p>${allData[index].content} <span>read more....</span></p>
      </div>
      <div class="icon">
        <i class='fa-regular fa-heart fa-icon ${
          savedNews.includes(index + "") ? "fa-solid" : ""
        }' id=${index} onclick="saveToLocal()"></i>
      </div>
    `;
    container.appendChild(contentContainer);
  });
}

if (document.getElementById("savedNews")) {
  document
    .getElementById("savedNews")
    .addEventListener("click", displaySavedNews());
}
