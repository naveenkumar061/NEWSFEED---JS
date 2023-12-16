const fetchNews = async () => {
  let result = await fetch(
    "https://content.newtonschool.co/v1/pr/64e3d1b73321338e9f18e1a1/inshortsnews"
  );
  let response = await result.json();
  return response;
};

const getCategories = async () => {
  const allCategoryInfo = await fetchNews();
  // console.log(allCategoryInfo);
  const categoryList = new Set();
  allCategoryInfo.map((item, index) => {
    categoryList.add(item.category);
  });
  const categoryListArray = Array.from(categoryList);
  categoryListArray.unshift("All");
  const getCategoryContainer = document.getElementById("getCategories");
  categoryListArray.map((categoryName, index) => {
    const button = document.createElement("button");
    button.classList.add("category");
    button.textContent = categoryName;
    getCategoryContainer.appendChild(button);
    button.addEventListener("click", () => {
      document.getElementById("new").innerHTML = "";
      filterData(categoryName);
    });
  });
};
getCategories();

const filterData = async (value) => {
  const allData = await fetchNews();
  const container = document.getElementById("new");
  allData.map((item, index) => {
    if (value === "All" || value === item.category) {
      const newContainer = document.createElement("div");
      newContainer.innerHTML = `
        <div>
            <p>by <span>${item.author}</span></p>
            <p>category <span>${item.category}</span></p>
        </div>
        <div>
            <p>${item.content} <span>read more.</span></p>
        </div>
        <div id"saved"><i class="fa-regular fa-heart"></i></div>
      `;
      container.appendChild(newContainer);
    }
  });
};

filterData("All");
