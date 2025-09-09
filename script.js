const categoriesContainer = document.getElementById("categories-container");
const plantsContainer = document.getElementById("plant-container");
const cartContainer = document.getElementById("cart-container"); // Renamed for clarity

const loadCategories = async () => {
  manageSpinner(true);
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/categories"
    );
    const data = await res.json();
    displayCategories(data.categories);
  } catch (error) {
    console.error("Error loading categories:", error);
  } finally {
    manageSpinner(false);
  }
};

const manageSpinner = (status) => {
  if (status) {
    document.getElementById("spinner").classList.remove("hidden");
    plantsContainer.classList.add("hidden");
  } else {
    plantsContainer.classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const displayPLants = (plants) => {
  plantsContainer.innerHTML = "";

  plants.forEach((plant) => {
    const plantDiv = document.createElement("div");
    plantDiv.innerHTML = `
      <div data-plant-id="${
        plant.id
      }" class="p-3 border border-gray-200 rounded-lg shadow-sm w-[230px] h-full">
        <img src="${plant.plant_image || plant.image}" alt="" />
        <h3 id="${plant.id}" class="font-semibold text-xl mt-2">${
      plant.plant_name || plant.name
    }</h3>
        <p class="my-2">${plant.plant_description || plant.description}</p>
        <div class="flex justify-between items-center">
          <h5 onclick="loadPlantDetail(${
            plant.id
          })" class="text-[#15803D] bg-green-300 rounded-[50px] px-4 py-1 cursor-pointer">
            ${plant.category || "Unknown"}
          </h5>
          <h5 class="font-medium">৳${plant.price || "N/A"}</h5>
        </div>
        <button class="btn btn-primary bg-green-600 rounded-[50px] w-full mt-4" data-id="${
          plant.id
        }" data-title="${plant.plant_name || plant.name}">
          Add to Cart
        </button>
      </div>
    `;
    plantsContainer.appendChild(plantDiv);
  });
  // Add event listener to the plants container to handle clicks on all buttons
  plantsContainer.addEventListener("click", btnClicked);
};

const displayCategories = (categories) => {
  categories.forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "category-item";
    categoryDiv.dataset.categoryId = category.id; // Storing the ID in a data attribute
    categoryDiv.innerHTML = `
      <div 
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
  manageSpinner(true);
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
    manageSpinner(false);
  }
};

// Load plants by category
const loadByCategory = async (id) => {
  manageSpinner(true);
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
    manageSpinner(false);
  }
};

// Event listener for categories, replacing the old, buggy one
categoriesContainer.addEventListener("click", (e) => {
  const categoryItem = e.target.closest(".category-item");
  if (!categoryItem) return;

  const categoryDivs = categoriesContainer.querySelectorAll(".category-item");
  categoryDivs.forEach((div) => {
    div.classList.remove("active");
  });

  categoryItem.classList.add("active");
  const categoryId = categoryItem.dataset.categoryId;
  loadByCategory(categoryId);
});

const loadPlantDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayPlantDetails(details.plants);
};

const displayPlantDetails = (plant) => {
  const plantBox = document.getElementById("plants-details-container");
  plantBox.innerHTML = `
  <div class="p-3 border border-gray-200 rounded-lg shadow-sm w-full h-full">
    <h3 class="font-semibold text-xl mt-2 py-4">${
      plant.plant_name || plant.name
    }</h3>
    <img src="${plant.plant_image || plant.image}" alt="" />
    <p class="my-2"> <span class="font-semibold text-lg">Description: <br></span> ${
      plant.plant_description || plant.description
    }</p>
    <div class="flex justify-between items-center">
      <h5 class=" py-1"> <span class="font-semibold text-lg">Category: </span>
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

// Cart functionality
let addedCarts = [];

const btnClicked = (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const title = btn.dataset.title;
  const id = btn.dataset.id;

  const plantElement = btn.closest("[data-plant-id]");
  const priceElement = plantElement.querySelector("h5.font-medium");
  const priceText = priceElement
    ? priceElement.textContent.match(/৳(\d+)/)
    : null;

  const price = priceText ? parseFloat(priceText[1]) : 0;

  const existingItem = addedCarts.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity++;
    existingItem.totalPrice = existingItem.quantity * price;
  } else {
    addedCarts.push({
      id: id,
      title: title,
      price: price,
      quantity: 1,
      totalPrice: price,
    });
  }

  showYourCart();
};

const showYourCart = () => {
  cartContainer.innerHTML = "";

  const cartItemsDiv = document.createElement("div");
  cartItemsDiv.id = "cart-items-container";
  cartContainer.appendChild(cartItemsDiv);

  addedCarts.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item-div";
    itemDiv.setAttribute("data-id", item.id);
    itemDiv.innerHTML = `
      <div class="flex justify-between items-center py-2 border-b border-gray-200 bg-[#f0fdf4] m-2 px-3 rounded-md">
        <div class="flex items-center space-x-2">
          <h1 class="text-base font-semibold">${item.title}</h1>
          <span class="text-xs text-gray-500">(${item.quantity})</span>
        </div>
        <div class="flex items-center space-x-4">
          <h5 class="text-sm font-medium">৳${item.totalPrice}</h5>
          <span
            onclick="deleteItem('${item.id}')"
            class="text-red-500 cursor-pointer text-base font-bold"
          >
            &times;
          </span>
        </div>
      </div>
    `;
    cartItemsDiv.appendChild(itemDiv);
  });

  const totalDiv = document.createElement("div");
  totalDiv.id = "total-price-div";
  cartContainer.appendChild(totalDiv);

  updateOverallTotal();
};

const updateOverallTotal = () => {
  let overallTotalPrice = 0;
  addedCarts.forEach((item) => {
    overallTotalPrice += item.totalPrice;
  });

  const totalDiv = document.getElementById("total-price-div");
  if (totalDiv) {
    totalDiv.innerHTML = `
      <hr class="my-2">
      <div class="flex justify-between items-center py-2 font-bold">
        <h1 class="text-xl">Total:</h1>
        <h5 class="text-xl">৳${overallTotalPrice}</h5>
      </div>
    `;
  }
};

const deleteItem = (id) => {
  const itemToRemove = document.querySelector(`.item-div[data-id="${id}"]`);
  if (itemToRemove) {
    itemToRemove.remove();
  }

  addedCarts = addedCarts.filter((item) => item.id !== id);
  updateOverallTotal();
};
loadCategories();
loadPlants();
