export let cart = [{
 productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
 quantity: 2
},
{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
 quantity: 1
}];

export function addToCart(button) {

   let FindProduct = false;

      cart.forEach((cartItem) => {
        if (button.dataset.productId === cartItem.productId) {
          cartItem.quantity += Number(document.querySelector(`.js-quantity-selector-${cartItem.productId}`).value);
          FindProduct = true }
      });

      if (FindProduct === false) {

        cart.push({
          productId: button.dataset.productId,

          quantity: Number(document.querySelector(`.js-quantity-selector-${button.dataset.productId}`).value)
        });
        
      };
};

export function removeFromCart(productId) {
  const newCart = []

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem)
    }
  })

  cart = newCart

  document.querySelector(`.js-cart-item-container-${productId}`).remove()
}