//https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2 

let nav_location = document.getElementById("location")
nav_location.addEventListener("click", (e) => {
  nav_location.innerHTML = 'Fetching location...'
  navigator.geolocation.getCurrentPosition((pos) => {
    let lan = pos.coords.latitude
    let long = pos.coords.longitude
    let locaApi = `https://nominatim.openstreetmap.org/reverse?lat=${lan}&lon=${long}&format=jsonv2`
    let fetchingAre = async () => {
      let res = await fetch(locaApi)
      let { address: { suburb, city } } = await res.json()
      nav_location.innerHTML = `<i class="fa-solid fa-location-dot"></i>${suburb},${city}`
    }
    fetchingAre()
  })
})


//fetch heading data
let fetchpro_side_one = document.querySelector(".cat_side_one");//class header left image
let fetchpro_side_two = document.querySelector(".cat_side_two");//class header right info
//getting when clicking product local info
let org_fetch_pro_data_loc = JSON.parse(localStorage.getItem("clickcartdata"));
//copy org local data to other variable
let fetch_pro_data_loc = [...org_fetch_pro_data_loc]
//getting when clicking product session category name
let fetch_pro_data_ses_org = sessionStorage.getItem("clickcart")
//copy session category name
let fetch_pro_data_ses = fetch_pro_data_ses_org
//function   product header info
function product_click_header_info(fetch_pro_data_loc_info, fetch_pro_data_ses_info) {
  fetchpro_side_one.innerHTML = `<img src="${fetch_pro_data_loc_info[0].thumbnail}" alt="${fetch_pro_data_ses_info}" height="100" width="100">`
  fetchpro_side_two.innerHTML = `<h2>${fetch_pro_data_loc_info[0].category}</h2><p>${fetch_pro_data_loc_info.length} products . Delivered in 10 minutes</p>`
}
product_click_header_info(fetch_pro_data_loc, fetch_pro_data_ses)

//fetching list of all categories
let pro_cat_list = document.querySelector(".pro_cat_side_two")
function product_category_list(fetch_pro_data_loc_list) {
  pro_cat_list.innerHTML = ""

  fetch_pro_data_loc_list.forEach((item) => {
let finalPrice=Math.ceil(item.price - (item.price * item.discountPercentage / 100))
let qty=productQty(item.id)
    //  console.log(item)
    pro_cat_list.innerHTML += `
<div class="category_item_info_carts">
                <div class="cart_top_info"> 
                <p class="discountPercent">${item.discountPercentage}% Off</p>
                <div><img src="${item.thumbnail}" alt="${item.title}"height="100" width="100" ></div>
                <p class="wishlist"><i class="fa-solid fa-heart"></i></p>
                </div>
                <div class="cart_bottom_info">
                <p class="delivery-time">⚡ ${Math.floor(Math.random() * (10 - 5 + 1)) + 5}Mins</p>
          <p class="product-title">${item.title}</p>
          <p class="product-brand">${item.brand || "Imported"}</p>
          <div class="product-price">
            <p class="discount-price">$${finalPrice}</p>
            <p class="actual-price">$${item.price}</p>
           ${qty===0?`<button class-data="classdata" class="addBtn" data-id="${item.id}" data-title="${item.title}" data-price="${finalPrice}" data-img="${item.thumbnail}" data-qty="${qty}">Add</button>`
                  :
                  `<div calass="cartAdd_inc_desc_fun">
                    <button class="qty_btn incBtn" data-id="${item.id}"  data-qty="${qty}">+</button><span class=qty_fn>${qty}</span><button class="qty_btn descBtn" data-id="${item.id}" data-qty="${qty}">-</button>
                  </div>`              
              }
          </div>
          <p class="ratings"><i class="fa-regular fa-star"></i>${item.rating} (${item.stock})</p>
                </div>
</div>
`

  })

  wishlistIcons()
  addEventfn()
increaseButtonEvents()
 decreaseButtonEvents()
}
product_category_list(fetch_pro_data_loc)



//! Wishlist
function wishlistIcons() {
  let wishListIcons = document.querySelectorAll(".wishlist>i")
  wishListIcons.forEach((item) => {
    // console.log(item)
    item.addEventListener("click", () => {
      item.classList.toggle("clicked")
    })
  })
}
//!FILTER FUNCTIONALITY
let relevance = document.getElementById("Relevance")
let priceAsc = document.getElementById("priceAsc")
let priceDesc = document.getElementById("priceDesc")
let discount = document.getElementById("discountPrice")
let maxPriceAmount = document.querySelector("#mix_price>span")
let maxPrice = document.getElementById("maxPrice")
let inStock = document.getElementById("inStock")

function applyingFilters() {
  let filteredProducts = [...org_fetch_pro_data_loc]
  // console.log(filteredProducts)
  if (priceAsc.checked) {
    filteredProducts.sort((a, b) => Math.ceil(a.price - (a.price * a.discountPercentage / 100))- (Math.ceil(b.price - (b.price * b.discountPercentage / 100))))
  } else if (priceDesc.checked) {
    filteredProducts.sort((a, b) => Math.ceil(b.price - (b.price * b.discountPercentage / 100))- (Math.ceil(a.price - (a.price * a.discountPercentage / 100))))
  } else if (discount.checked) {
    filteredProducts.sort((a, b) => b.discountPercentage - a.discountPercentage)
  } else {
    filteredProducts = [...filteredProducts]
  }

  //*Price Range
  filteredProducts = filteredProducts.filter((item) => {
    return (item.price <= maxPrice.value)
  })

  //*In Stock
  if (inStock.checked) {
    filteredProducts = filteredProducts.filter((item) => {
      return item.stock > 0
    })
  }
  product_category_list(filteredProducts)
}

relevance.addEventListener("change", applyingFilters)
priceAsc.addEventListener("change", applyingFilters)
priceDesc.addEventListener("change", applyingFilters)
discount.addEventListener("change", applyingFilters)
inStock.addEventListener("change", applyingFilters)
maxPrice.addEventListener("input", () => {
  maxPriceAmount.innerHTML = maxPrice.value
  // console.log(maxPrice.value)
  applyingFilters()
})
applyingFilters()



//addEvent
function addEventfn(){
  let list_cat_id=document.querySelectorAll(".addBtn")
  //console.dir(list_cat_id)
  list_cat_id.forEach((lci)=>{
    //  console.dir(lci)
    //let product=""
lci.addEventListener("click",()=>{
let product={
  id:Number(lci.dataset.id),
  title: lci.dataset.title,
  price: Number(lci.dataset.price),
  img:lci.dataset.img,
  qty:Number(lci.dataset.qty)
}
// console.log(`product${product}`)
      addCartItems(product)
      product_category_list(fetch_pro_data_loc)
  })
 
  })
   
}

function increaseButtonEvents() {
  let increaseBtns = document.querySelectorAll(".incBtn")
  // console.log(increaseBtns)
  increaseBtns.forEach((btn) => {
    // console.log(btn)
    btn.addEventListener("click", () => {
      // console.dir(btn)
      cartQtyIncrement(btn.dataset.id)
      // let qty_btn=document.getElementById(`cart_btn_input_qty_inc_${btn.dataset.id}`)
      // qty_btn.value=btn.dataset.qty
       product_category_list(fetch_pro_data_loc)
    })
  })
}

//!Decrease Button Events
function decreaseButtonEvents() {
  let decreaseBtns = document.querySelectorAll(".descBtn")
  decreaseBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      cartQtyDecrement(Number(btn.dataset.id))
      // console.dir(btn)
      // let qty_btn=document.getElementById(`cart_btn_input_qty_inc_${btn.dataset.id}`)
      // qty_btn.value=btn.dataset.qty
      product_category_list(fetch_pro_data_loc)
    })
  })
}