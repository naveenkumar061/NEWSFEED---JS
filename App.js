// Global Variables
let savedListArray = [];

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
getCategories();

// Displaying News
async function displayNews(value) {
  const allData = await fetchNews();
  const container = document.getElementById("allNewsDetails");
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
          <i class="fa-regular fa-heart"></i>
        </div>
      `;
      container.appendChild(contentContainer);
    }
  });
}

displayNews("All");
