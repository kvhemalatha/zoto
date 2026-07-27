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



let category_items = [
  {
    slug: "beauty",
    name: "Beauty",
    url: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
  },
  {
    slug: "fragrances",
    name: "Fragrances",
    url: "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp"
  },
  {
    slug: "furniture",
    name: "Furniture",
    url: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/1.webp"
  },
  {
    slug: "groceries",
    name: "Groceries",
    url: "https://cdn.dummyjson.com/product-images/groceries/apple/1.webp"
  },
  {
    slug: "home-decoration",
    name: "Home Decoration",
    url: "https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/1.webp"
  },
  {
    slug: "kitchen-accessories",
    name: "Kitchen Accessories",
    url: "https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/1.webp"
  },
  {
    slug: "laptops",
    name: "Laptops",
    url: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp"
  },
  {
    slug: "mens-shirts",
    name: "Mens Shirts",
    url: "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp"
  },
  {
    slug: "mens-shoes",
    name: "Mens Shoes",
    url: "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/1.webp"
  },
  {
    slug: "mens-watches",
    name: "Mens Watches",
    url: "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/1.webp"
  },
  {
    slug: "mobile-accessories",
    name: "Mobile Accessories",
    url: "https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/1.webp"
  },
  {
    slug: "motorcycle",
    name: "Motorcycle",
    url: "https://cdn.dummyjson.com/product-images/motorcycle/generic-motorcycle/1.webp"
  },
  {
    slug: "skin-care",
    name: "Skin Care",
    url: "https://cdn.dummyjson.com/product-images/skin-care/attitude-super-leaves-hand-soap/1.webp"
  },
  {
    slug: "smartphones",
    name: "Smartphones",
    url: "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/1.webp"
  },
  {
    slug: "sports-accessories",
    name: "Sports Accessories",
    url: "https://cdn.dummyjson.com/product-images/sports-accessories/american-football/1.webp"
  },
  {
    slug: "sunglasses",
    name: "Sunglasses",
    url: "https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/1.webp"
  },
  {
    slug: "tablets",
    name: "Tablets",
    url: "https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/1.webp"
  },
  {
    slug: "tops",
    name: "Tops",
    url: "https://cdn.dummyjson.com/product-images/tops/blue-frock/1.webp"
  },
  {
    slug: "vehicle",
    name: "Vehicle",
    url: "https://cdn.dummyjson.com/product-images/vehicle/300-touring/1.webp"
  },
  {
    slug: "womens-bags",
    name: "Womens Bags",
    url: "https://cdn.dummyjson.com/product-images/womens-bags/blue-women's-handbag/1.webp"
  },
  {
    slug: "womens-dresses",
    name: "Womens Dresses",
    url: "https://cdn.dummyjson.com/product-images/womens-dresses/black-women's-gown/1.webp"
  },
  {
    slug: "womens-jewellery",
    name: "Womens Jewellery",
    url: "https://cdn.dummyjson.com/product-images/womens-jewellery/green-crystal-earring/1.webp"
  },
  {
    slug: "womens-shoes",
    name: "Womens Shoes",
    url: "https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/1.webp"
  },
  {
    slug: "womens-watches",
    name: "Womens Watches",
    url: "https://cdn.dummyjson.com/product-images/womens-watches/rolex-datejust-women/1.webp"
  }
]

// let fetchCate = () => {
//   let cat_items = document.getElementById("product_items_list")
//   category_items.forEach((cat) => {
//     cat_items.innerHTML += `<div class="items_grid">
//                 <div class="category_image"><img src="${cat.url}" alt="${cat.slug}"></div>
//                 <div class="category_name">${cat.name}</div>                
//             </div>`
//   })
// }
// fetchCate()






//fetching list of all categories
let pro_cat_list = document.querySelector("#product_items_list")

// let url_s = "https://dummyjson.com/products"
// console.log(url_s)
// let res = await fetch(url_s)
// let { products } = await res.json()
let allproduct = []
async function display_product_category_list() {

  let url_s = "https://dummyjson.com/products"

  let res = await fetch(url_s)

  let { products } = await res.json()
  // console.log(products)
  allproduct = products
  reportingDisply(allproduct)
  let searchbar = document.querySelector(".searchInput>input")
  searchbar.addEventListener("input", (e) => {
    let searchVal = e.target.value.trim().toLowerCase()
    let filterva = allproduct.filter((items) => {
      let pic = Math.ceil(items.price - (items.price * items.discountPercentage / 100))
      return items.title.trim().toLowerCase().includes(searchVal) || pic === Number(searchVal)

    })

    reportingDisply(filterva)
    relevance.addEventListener("change", () => {


    })
  })

  // console.log(products)
  wishlistIcons()

}
display_product_category_list()


//fileter baserd on parameter
function applyingFilters_para(allproduct) {
  let filteredProducts = [...allproduct]
  // console.log(filteredProducts)
  if (priceAsc.checked) {
    filteredProducts.sort((a, b) => a.price - b.price)
  } else if (priceDesc.checked) {
    filteredProducts.sort((a, b) => b.price - a.price)
  } else if (discount.checked) {
    filteredProducts.sort((a, b) => b.discountPercentage - a.discountPercentage)
  } else {
    filteredProducts = [...filteredProducts]
  }

}

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
function reportingDisply(products) {
  pro_cat_list.innerHTML = ""
  products.forEach((cat) => {
  let finalPrice=Math.ceil(cat.price - (cat.price * cat.discountPercentage / 100))
  let qty=productQty(cat.id)
    // console.log(cat)
    pro_cat_list.innerHTML += `
   
<div class="items_grid category_item_info_carts">
 
    <div class="category_image">
      <div class="cart_top_info"> 
        <p class="discountPercent">${cat.discountPercentage}% Off</p>
      
        <img src="${cat.thumbnail}" alt="${cat.title}"height="100" width="100" >
      
      <p class="wishlist">
        <i class="fa-solid fa-heart"></i>
      </p>
      </div>
    </div>


    <div class="category_name">
      <div class="cart_bottom_info">
          <p class="delivery-time">⚡ ${Math.floor(Math.random() * (10 - 5 + 1)) + 5}Mins</p>
          <p class="product-title">${cat.title}</p>
          <p class="product-brand">${cat.brand || "Imported"}</p>
          <div class="product-price">
              <p class="discount-price">$${finalPrice}</p>
              <p class="actual-price">$${cat.price}</p>
                  ${qty===0?`<button class-data="classdata" class="addBtn" data-id="${cat.id}" data-title="${cat.title}" data-price="${finalPrice}" data-img="${cat.thumbnail}" data-qty="${qty}">Add</button>`
                  :
                  `<div calass="cartAdd_inc_desc_fun">
                    <button class="incBtn" data-id="${cat.id}"  data-qty="${qty}">+</button><span class=qty_fn><input class="qty_val_input" type="text" name="qty_val" value="${qty}" id="cart_btn_input_qty_inc_${cat.id}"></span><button class="descBtn" data-id="${cat.id}" data-qty="${qty}">-</button>
                  </div>`              
              }
          </div>
          <p class="ratings">
              <i class="fa-regular fa-star"></i>
              ${cat.rating} (${cat.stock})
          </p>
      </div>                
    </div>  

 </div>`

  })
  wishlistIcons() 
addEventfn()
increaseButtonEvents()
 decreaseButtonEvents()
}



//get individual categories
let cate_items = document.querySelectorAll(".items_grid")

cate_items.forEach((item) => {
  let item_name_modify = item.innerText.replace(" ", "-")
  let item_name = item.querySelectorAll("img").alt
  item.addEventListener("click", () => {
    cat_name = item.querySelector("img").alt
    sessionStorage.setItem("clickcart", cat_name)
    fetchindDetails()
    setTimeout(() => {
      location.assign("./category.html")
    }, 2000)
  });
})
async function fetchindDetails() {
  let cat_name_s = sessionStorage.getItem("clickcart")
  let url_s = `https://dummyjson.com/products/category/${cat_name_s}`
  let res = await fetch(url_s)
  let { products } = await res.json()
  // console.log(res)
  localStorage.setItem("clickcartdata", JSON.stringify(products))
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
  let filteredProducts = [...allproduct]
  // console.log(filteredProducts)
  if (priceAsc.checked) {
    filteredProducts.sort((a, b) => a.price - b.price)
  } else if (priceDesc.checked) {
    filteredProducts.sort((a, b) => b.price - a.price)
  } else if (discount.checked) {
    filteredProducts.sort((a, b) => b.discountPercentage - a.discountPercentage)
  } else {
    filteredProducts = [...filteredProducts]
  }

  //*Price Range
  filteredProducts = filteredProducts.filter((item) => {
    // console.log(item.price <= maxPrice.value)
    return (item.price <= maxPrice.value)
  })








  //*In Stock
  if (inStock.checked) {
    filteredProducts = filteredProducts.filter((item) => {
      return item.stock > 0
    })
  }
  reportingDisply(filteredProducts)
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
  id:lci.dataset.id,
  title: lci.dataset.title,
  price: Number(lci.dataset.price),
  img:lci.dataset.img,
  qty:Number(lci.dataset.qty)
}
// console.log(`product${product}`)
      addCartItems(product)
      reportingDisply(allproduct )
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
      let qty_btn=document.getElementById(`cart_btn_input_qty_inc_${btn.dataset.id}`)
      qty_btn.value=btn.dataset.qty
      reportingDisply(allproduct )
    })
  })
}

//!Decrease Button Events
function decreaseButtonEvents() {
  let decreaseBtns = document.querySelectorAll(".descBtn")
  decreaseBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      cartQtyDecrement(Number(btn.dataset.id))
      console.dir(btn)
      let qty_btn=document.getElementById(`cart_btn_input_qty_inc_${btn.dataset.id}`)
      qty_btn.value=btn.dataset.qty
      reportingDisply(allproduct )
    })
  })
}