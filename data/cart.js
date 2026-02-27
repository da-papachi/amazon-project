export let cart = JSON.parse(localStorage.getItem('cart')) || [

{ productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
 quantity: 2,
 deliveryOptionId: '1'
},

{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
 quantity: 1,
 deliveryOptionId: '2'
}
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

          quantity: Number(document.querySelector(`.js-quantity-selector-${button.dataset.productId}`).value),

          deliveryOptionId: 1
        });
        
      };
    
    saveToStorage()
};

export function CountItems() {
  document.querySelector('.js-return-to-home-link').innerText = `${cart.length} items`
}

export function removeFromCart(productId) {
  const newCart = []

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem)
    }
  })

  cart = newCart
  
  saveToStorage()
  CountItems()
  document.querySelector(`.js-cart-item-container-${productId}`).remove()
}

export function updateCartItem(link, productId) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity')

      link.style.display = 'none'
      document.querySelector(`.js-quantity-input-${productId}`).style.display = 'initial'
      document.querySelectorAll(`.js-save-quantity-link`).forEach((saveLink) => {
        if (saveLink.dataset.productId === productId) {
          saveLink.style.display = 'initial'
        }
      })

      document.querySelector(`.js-quantity-input-${productId}`).value = cartItem.quantity

    }
  })
}

export function saveQuantity(productId) {
  cart.forEach((cartItem) => {
    let inputQuantity = document.querySelector(`.js-quantity-input-${productId}`)

    if (cartItem.productId === productId && !Number.isNaN(Number(inputQuantity.value)) && Number(inputQuantity.value) > 0 && Number(inputQuantity.value) < 1000) {

      cartItem.quantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value)
      
      document.querySelector(`.js-quantity-label-${productId}`).innerText = document.querySelector(`.js-quantity-input-${productId}`).value

      document.querySelector(`.js-quantity-input-${productId}`).style.display = 'none'
      document.querySelectorAll(`.js-save-quantity-link`).forEach((saveLink) => {
        if (saveLink.dataset.productId === productId) {
          saveLink.style.display = 'none'
        }
      })

      document.querySelectorAll(`.js-update-quantity-link`).forEach((updateLink) => {
        if (updateLink.dataset.productId === productId) {
          updateLink.style.display = 'initial'
        }
      })


      document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity')

      
      saveToStorage()
    }
  })
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
   cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem;
         }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}

