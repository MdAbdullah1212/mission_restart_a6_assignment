//Loaded All Product one by one
const loadedAllProduct = () =>{
    removeActive()
    fetch(`https://fakestoreapi.com/products`)
    .then(res => res.json())
    .then(data => displayAllCategories(data))
}
const displayAllCategories = (allProudtName) =>{
    const allCardDisplay = document.getElementById('card-items');
    allCardDisplay.innerHTML = '';
    allProudtName.forEach(cards =>{
        const createCard = document.createElement('div');
        createCard.innerHTML = `
           <div class="bg-gray-100 p-5 shadow-sm rounded-sm space-y-3">
                    <div ><img class="h-50 w-full" src="${cards.image}" alt=""></div>
                    <div class="flex justify-between items-center">
                        <p class="btn text-xs text-blue-700">${cards.category}</p>
                        <div class="flex items-center gap-1">
                            <i class="fa-solid fa-star text-yellow-400"></i>
                            <p>${cards.rating.rate} (${cards.rating.count})</p>
                        </div>
                    </div>
                    <h3 class="font-semibold text-gray-500 text-md line-clamp-1 text-start">${cards.title}</h3>
                    <p class="font-bold text-xl text-start">$${cards.price}</p>
                    <div class="flex gap-2 justify-between items-center flex-wrap">
                        <button onclick="loadProductDetails(${cards.id})" class="btn text-gray-500 flex-1"><i class="fa-regular fa-eye"></i> Details</button>
                        <button class="btn btn-primary flex-1"><i class="fa-solid fa-cart-shopping"></i>
                            Add</button>
                    </div>
                </div>
        `;
        allCardDisplay.appendChild(createCard)
    })
}
//Loaded Details Product with modal
const loadProductDetails = (id) =>{
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(pdata => productDetails(pdata))
}
// Details product show with modal
const productDetails = (details) =>{
    const showModal = document.getElementById('show-modal');
    showModal.innerHTML = `
        <div class="space-y-3">
                    <img src="${details.image}" alt="">
                    <p class="btn text-xs text-blue-700">${details.category}</p>
                    <h3 class="font-semibold text-md">${details.title}</h3>
                    <p class="font-semibold text-sm text-gray-500 text-justify">${details.description}</p>
                    <div class="flex gap-2 justify-between items-center flex-wrap">
                        <p class="font-bold text-xl flex-2">Price : $${details.price}</p>
                        <button onclick="add-to-card()" class="btn btn-primary flex-1"><i class="fa-solid fa-cart-shopping"></i>
                            Add to Cart</button>
                    </div>
                </div>
    `;
    document.getElementById('details-modal').showModal();
}

// Loaded All Category Products with api
const loadAllCategory = () => {
    fetch(`https://fakestoreapi.com/products/categories`)
        .then(res => res.json())
        .then(json => 
            displayAllCategory(json)
        )
}

//Loaded Products by category
const loadedCategoryByProduct = (id) => {
    const url = `https://fakestoreapi.com/products/category/${id}`;
    // console.log(ulr)
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive()
            const clicked = document.getElementById(`active-btn-${id}`);
            clicked.classList.add('active')
            displyCategoryByProduct(data)
        })
}

const removeActive = () =>{
    const activeRemove = document.querySelectorAll('.click-active');
    activeRemove.forEach(btn => btn.classList.remove('active'))
}

// Category is Display when clicked categories button
const displyCategoryByProduct = (categoryName) => {
    // console.log(categoryName)
    const cardItem = document.getElementById('card-items');
    cardItem.innerHTML = '';
    categoryName.forEach(product => {
        const card = document.createElement('div');
        card.innerHTML = `
            <div class="bg-gray-100 p-5 shadow-sm rounded-sm space-y-3">
                    <div ><img class="h-50 w-full" src="${product.image}" alt=""></div>
                    <div class="flex justify-between items-center">
                        <p class="btn text-xs text-blue-700">${product.category}</p>
                        <div class="flex items-center gap-1">
                            <i class="fa-solid fa-star text-yellow-400"></i>
                            <p>${product.rating.rate} (${product.rating.count})</p>
                        </div>
                    </div>
                    <h3 class="font-semibold text-gray-500 text-md line-clamp-1 text-start">${product.title}</h3>
                    <p class="font-bold text-xl text-start">$${product.price}</p>
                    <div class="flex gap-2 justify-between items-center flex-wrap">
                        <button onclick="loadProductDetails(${product.id})" class="btn text-gray-500 flex-1"><i class="fa-regular fa-eye"></i> Details</button>
                        <button class="btn btn-primary flex-1"><i class="fa-solid fa-cart-shopping"></i>
                            Add</button>
                    </div>
                </div>
        `;
        cardItem.appendChild(card)
    })
}
const displayAllCategory = (categories) => {
    // console.log(categories)
    const allProductCatergory = document.getElementById('product-categories');
    allProductCatergory.innerHTML = '';
    for (let category of categories) {
        const categoriesBtn = document.createElement('div');
        categoriesBtn.innerHTML = `
            <button onclick="loadedCategoryByProduct('${category.replace(/'/g, "\\'")}')" id="active-btn-${category}" class="btn rounded-full space-x-4 click-active">${category}</button>
        `;
        allProductCatergory.appendChild(categoriesBtn)
    }

}
loadedAllProduct()
loadAllCategory()