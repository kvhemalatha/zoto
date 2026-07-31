let cart_key = "cartItems"
function getCartITems() {
    return JSON.parse(localStorage.getItem(cart_key)) || []
}
function setCartItems(cartItems) {
    return localStorage.setItem(cart_key, JSON.stringify(cartItems))
}
function addCartItems(product) {
    // console.log(product)
    let cartItems = getCartITems()
    let exist = cartItems.find((item) => {
        return item.id === product.id
    })
    if (exist) {
        exist.qty++
    }
    else {
        cartItems.push({
            id: product.id,
            title: product.title,
            qty: product.qty,
            price: product.price,
            img: product.img
        })
        // console.log(cartItems)
    }
    setCartItems(cartItems)
}
function cartQtyIncrement(productId) {
    let cartItems = getCartITems()
//     if (!Array.isArray(cartItems)) {
//     cartItems = []; 
//   }

    let exist = cartItems.find((item) => {
        return item.id == productId
    })
    if (exist) {
        exist.qty++
    }
    setCartItems(cartItems)

}
function cartQtyDecrement(productId) {
    let cartItems = getCartITems()
    let exist = cartItems.find((item) => {
        return item.id == productId
    })
    if (exist) {
if(exist.qty > 0){
  // 2. Code block to run
//   console.log(exist.qty);   
  exist.qty-- 
} 
       
       
}
    setCartItems(cartItems)

}
function productQty(productId) {     
    let cartItems = getCartITems()   
    // console.log(productId)
    let exist = cartItems.find((item) => {
            return item.id === productId
        })
        if (exist) {
            // console.log("jhjjj",found)
            return exist.qty
        }
        return 0


    setCartItems(cartItems)
}