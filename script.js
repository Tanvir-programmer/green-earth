const categoriesContainer = document.getElementById("categories-container");
const plantsContainer = document.getElementById("plant-container");
const loadCategories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories"
  );
  const data = await res.json();
  displayCategories(data.categories);
  //   console.log(data.categories);
};

const loadPlants = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();

  console.log("API working:", data);

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
    categoryDiv.innerHTML = `
     <div>
          <div class="">
            <div
              class="text-xl my-4 hover:bg-green-600 w-[20S0px] rounded-lg pl-3 p-2"
            >
              ${category.category_name}
            </div>
          </div>
        </div>
    `;
    categoriesContainer.appendChild(categoryDiv);
  });
};

loadCategories();
loadPlants();
