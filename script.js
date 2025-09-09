const categoriesContainer = document.getElementById("categories-container");
const plantsContainer = document.getElementById("plant-container");
const clickContainer = document.getElementById("click-container");

const loadCategories = async () => {
  manageSpinner(true);
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories"
  );

  const data = await res.json();
  displayCategories(data.categories);
  manageSpinner(false);
};
const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("plant-container").classList.add("hidden");
  } else {
    document.getElementById("plant-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const displayPLants = (plants) => {
  plantsContainer.innerHTML = "";

  plants.forEach((plant) => {
    const plantDiv = document.createElement("div");
    plantDiv.innerHTML = `
      <div id="click-container"  class="p-3 border border-gray-200 rounded-lg shadow-sm w-[230px] h-full">
        <img src="${plant.plant_image || plant.image}" alt="" />
        <h3 class="font-semibold text-xl mt-2">${
          plant.plant_name || plant.name
        }</h3>
        <p class="my-2">${plant.plant_description || plant.description}</p>
        <div class="flex justify-between items-center">
          <h5 onclick="loadPlantDetail(${
            plant.id
          })"  class="text-[#15803D] bg-green-300 rounded-[50px] px-4 py-1 cursor-pointer">
            ${plant.category || "Unknown"}
          </h5>
          <h5 class="font-medium">৳${plant.price || "N/A"}</h5>
        </div>
        <button class="btn btn-primary bg-green-600 rounded-[50px] w-full mt-4">
          Add to Cart
        </button>
      </div>
    `;
    plantsContainer.appendChild(plantDiv);
    const btn = plantDiv.querySelector("button");
    btn.addEventListener("click", btnClicked);
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

// Load all plants
const loadPlants = async () => {
  manageSpinner(true); // show spinner
  try {
    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json();

    if (data.plants && Array.isArray(data.plants)) {
      displayPLants(data.plants);
    } else {
      console.error("Unexpected API format:", data);
    }
  } catch (error) {
    console.error("Error loading plants:", error);
  } finally {
    manageSpinner(false); // hide spinner after render
  }
};

// Load plants by category
const loadByCategory = async (id) => {
  manageSpinner(true); // show spinner
  try {
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.plants && Array.isArray(data.plants)) {
      displayPLants(data.plants);
    } else {
      console.error("Unexpected API format:", data);
    }
  } catch (error) {
    console.error("Error loading category:", error);
  } finally {
    manageSpinner(false); // hide spinner after render
  }
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
const loadPlantDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  console.log(details);
  displayPlantDetails(details.plants);
};

const displayPlantDetails = (plant) => {
  const plantBox = document.getElementById("plants-details-container");
  plantBox.innerHTML = `
  <div class="p-3 border border-gray-200 rounded-lg shadow-sm w-full h-full">
  <h3 class="font-semibold text-xl mt-2 py-4">${
    plant.plant_name || plant.name
  }</h3>
        <img class="" src="${plant.plant_image || plant.image}" alt="" />
        <p class="my-2"> <span class="font-semibold text-lg">Description: <br></span> ${
          plant.plant_description || plant.description
        }</p>
        <div class="flex justify-between items-center">
          <h5 class="text-[#15803D] bg-green-300 rounded-[50px] px-4 py-1">
            ${plant.category || "Unknown"}
          </h5>
          <h5 class="font-medium"><span class="font-semibold text-xl">Price:</span> ৳${
            plant.price || "N/A"
          }</h5>
        </div>
      
      </div>
  `;
  document.getElementById("my_modal_5").showModal();
};
// cart functionality
const btnClicked = (e) => {
  console.log(e.target.parentNode);
};
loadCategories();
loadPlants();
