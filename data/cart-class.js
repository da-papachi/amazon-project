class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [

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
    }

     saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems))
    }

    addToCart(addedProductId) {
      let matchingItem;

          this.cartItems.forEach((cartItem) => {
            if (addedProductId === cartItem.productId) { //if product exists (adds quantity)
              matchingItem = cartItem}
          });



          if (!matchingItem) { //if product doesnt exists, adds it to cart

            this.cartItems.push({
              productId: addedProductId,
              quantity: 1,
              /* quantity: Number(document.querySelector(`.js-quantity-selector-${addedProductId}`).value), */

              deliveryOptionId: '1'
            });
            
          } else {
              matchingItem.quantity++
            /*  matchingItem.quantity += Number(document.querySelector(`.js-quantity-selector-${matchingItem.productId}`).value); */
          };
        
        this.saveToStorage()
    }

    CountItems() {
        document.querySelector('.js-return-to-home-link').innerText = `${this.cartItems.length} items`
    }


    removeFromCart(productId) {
        const newCart = []

        this.cartItems.forEach((cartItem) => {
          if (cartItem.productId !== productId) {
            newCart.push(cartItem)
          }
        })

        this.cartItems = newCart
        
        this.saveToStorage()
        this.CountItems()
        document.querySelector(`.js-cart-item-container-${productId}`).remove()
    }



    updateCartItem(link, productId) {
        this.cartItems.forEach((cartItem) => {
          if (cartItem.productId === productId) {
            document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity')

            link.style.display = 'none'
            document.querySelector(`.js-quantity-input-${productId}`).style.display = 'initial'
            document.querySelectorAll(`.js-save-quantity-link`).forEach((saveLink) => {
              if (saveLink.dataset.productId === productId) {
                saveLink.style.display = 'initial'
              };

            });

            document.querySelector(`.js-quantity-input-${productId}`).value = cartItem.quantity

          };
        });
      }


    saveQuantity(productId) {
        this.cartItems.forEach((cartItem) => {
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

            
            this.saveToStorage()
          }
        })
      }


    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                matchingItem = cartItem;
            }
        });

        matchingItem.deliveryOptionId = deliveryOptionId;

        this.saveToStorage();
      }


};





export const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');




