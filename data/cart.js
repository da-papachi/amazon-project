export const cart = [];

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
          productName: button.dataset.productName,
          productImage: button.dataset.productImage,
          productPrice: button.dataset.productPrice,
          
          quantity: Number(document.querySelector(`.js-quantity-selector-${button.dataset.productId}`).value)
        });
        
      };
};