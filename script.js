const categoriesContainer = document.getElementById("categories-container");
const plantsContainer = document.getElementById("plant-container");
const loadCategories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories"
  );
  const data = await res.json();
  console.log(data);
  displayCategories(data.categories);
};

const loadPlants = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();

  if (data.plants && Array.isArray(data.plants)) {
    displayPLants(data.plants);
  } else {
    console.error("Unexpected API format:", data);
  }
};

const displayPLants = (plants) => {
  plantsContainer.innerHTML = "";

  plants.forEach((plant) => {
    const plantDiv = document.createElement("div");
    plantDiv.innerHTML = `
      <div class="p-3 border border-gray-200 rounded-lg shadow-sm w-[230px] h-full">
        <img src="${plant.plant_image || plant.image}" alt="" />
        <h3 class="font-semibold text-xl mt-2">${
          plant.plant_name || plant.name
        }</h3>
        <p class="my-2">${plant.plant_description || plant.description}</p>
        <div class="flex justify-between items-center">
          <h5 class="text-[#15803D] bg-green-300 rounded-[50px] px-4 py-1">
            ${plant.category || "Unknown"}
          </h5>
          <h5 class="font-medium">৳${plant.price || "N/A"}</h5>
        </div>
        <button id="p" class="btn btn-primary bg-green-600 rounded-[50px] w-full mt-4">
          Add to Cart
        </button>
      </div>
    `;
    plantsContainer.appendChild(plantDiv);
  });
};
const displayCategories = (categories) => {
  categories.forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "category-item";
    categoryDiv.dataset.category = category.category_name;
    categoryDiv.innerHTML = `
      <div onclick="loadByCategory('${category.id}')"
        class="text-xl my-4 hover:bg-green-600 w-[20S0px] rounded-lg pl-3 p-2 hover:text-white cursor-pointer"
      >
        ${category.category_name}
      </div>
    `;
    categoriesContainer.appendChild(categoryDiv);
  });
};

const loadByCategory = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.plants && Array.isArray(data.plants)) {
        displayPLants(data.plants);
      } else {
        console.error("Unexpected API format:", data);
      }
    });
};

categoriesContainer.addEventListener("click", (e) => {
  const categoryItem = e.target.closest(".category-item");
  if (!categoryItem) return;

  const categoryDivs = categoriesContainer.querySelectorAll(".category-item");
  categoryDivs.forEach((div) => {
    if (div !== categoryItem) {
      div.classList.remove("active");
    }
  });

  categoryItem.classList.add("active");
  const categoryName = categoryItem.dataset.category;
  loadByCategory(encodeURIComponent(categoryName));
});

loadCategories();
loadPlants();
