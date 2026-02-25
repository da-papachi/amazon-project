export let cart = JSON.parse(localStorage.getItem('cart')) || [
  
];


function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(button) {

   let FindProduct = false;

      cart.forEach((cartItem) => {
        if (button.dataset.productId === cartItem.productId) { //if product exists (adds quantity)
          cartItem.quantity += Number(document.querySelector(`.js-quantity-selector-${cartItem.productId}`).value);
          FindProduct = true }
      });

      if (FindProduct === false) { //if product doesnt exists, adds it to cart

        cart.push({
          productId: button.dataset.productId,

          quantity: Number(document.querySelector(`.js-quantity-selector-${button.dataset.productId}`).value)
        });
        
      };
    
    saveToStorage()
};

export function removeFromCart(productId) {
  const newCart = []

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem)
    }
  })

  cart = newCart
  
  saveToStorage()

  document.querySelector(`.js-cart-item-container-${productId}`).remove()
}