

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

let fetchCate=()=>{
  let cat_items=document.getElementById("product_items_list")
 category_items.forEach((cat)=>{
  cat_items.innerHTML+=`<div class="items_grid">
                <div class="category_image"><img src="${cat.url}" alt="${cat.slug}"></div>
                <div class="category_name">${cat.name}</div>                
            </div>`
 })
}
fetchCate()