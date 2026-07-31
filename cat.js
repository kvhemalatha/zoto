function cartitesPro() {
let cartdetails=getCartITems()
let cartlist=document.querySelector(".cart-containe-two")
let cartBill=document.querySelector(".cart-containe-three")
cartlist.innerHTML=""
if(cartdetails.length==0){
  cartBill.innerHTML=""
     cartlist.innerHTML=`
      <div class="container-items list-empty">
       <div class="items-info">   
     <h3><a href="./product.html">Browser products list</a></h3>
     </div></div>
     `
     return
}
cartdetails.forEach((items)=>{
   
  cartlist.innerHTML +=`
 <div class="container-items">
                <div class="items-img">
                    <img src="${items.img}" alt="${items.title}">
                </div>
                <div class="items-info">                   
                        <h3>${items.title}</h3>
                         <p>${items.qty}</p>
                            <p>$${Math.round(items.qty*items.price)}</p> 
                     </div>
                <div class="item-buttons"><i class="fa-solid fa-trash-can cart_delete"  data-id=${items.id}></i></div>
            </div>`
            
})
cartDelete()
}
cartitesPro()

function cartDelete()
{
  let cartdetails=getCartITems()
  let cartDelete=document.querySelectorAll(".cart_delete");
 cartDelete.forEach((item)=>{
item.addEventListener("click",()=>{
  let productid=Number(item.dataset.id)
 cartdetails=cartdetails.filter((products)=>{
  return products.id!==productid
 })
 
  setCartItems(cartdetails)
  cartitesPro()
})
 })

}
cartDelete()