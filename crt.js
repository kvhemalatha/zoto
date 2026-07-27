let cart_key = "cartItems"
function getCartITems() {
    return JSON.parse(localStorage.getItem(cart_key)) || []
}
function setCartItems(cartItems) {
    return localStorage.setItem(cart_key, JSON.stringify(cartItems))
}
function addCartItems(product) {
    console.log(product)
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
            img: product.thubnail
        })
    }
    setCartItems(cartItems)
}
function cartQtyIncrement(productId) {
    let cartItems = getCartITems()
    let exist = cartItems.find((item) => {
        return item.id === productId
    })
    if (exist) {
        exist.qty++
    }
    setCartItems(cartItems)

}
function cartQtyDecrement(productId) {
    let cartItems = getCartITems()
    let exist = cartItems.find((item) => {
        return item.id === productId
    })
    if (exist) {

        exist.qty--
        if (exist.qty == 0) {
    cartItems = cartItems.find((item) => {
                return cartItems[item]!== productId
            })
        }
    }
    setCartItems(cartItems)

}
function productQty(productId) {   
    
    let cartItems = getCartITems()
    
    let exist = cartItems.find((item) => {
            return Number(item.id) === productId
        })
        if (exist) {
            // console.log(exist)
            return exist.qty
        }
        return 0


    setCartItems(cartItems)
}