import {cart} from "../../data/cart.js";
import {products} from '../../data/products.js';
import { formatCurrency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import {deliveryOptions, GetDeliveryOption} from '../../data/deliveryOptions.js'
import {renderPaymentSummary} from './paymentSummary.js'


export function renderOrderSummary() {
 
  let html = ``

  

  cart.cartItems.forEach((cartItem) => {

      const productId = cartItem.productId

      let matchingProduct;

      products.forEach((product) => {
          if (product.id === productId) {
              matchingProduct = product
          }
      });
      const deliveryOptionId = cartItem.deliveryOptionId

      let deliveryOption = GetDeliveryOption(deliveryOptionId);

      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays, 'days'
      )
      const dateString = deliveryDate.format('dddd, MMMM D')

      html += `

      <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src=${matchingProduct.image}>

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    $${matchingProduct.getPrice()}
                  </div>
                  <div class="product-quantity  js-product-quantity-${matchingProduct.id}">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity-link"
                    data-product-id = ${matchingProduct.id}>
                      Update
                    </span>
                    <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                    <span class="save-quantity-link link-primary js-save-quantity-link"
                    data-product-id=${matchingProduct.id}>
                      Save
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}"
                    data-product-id=${matchingProduct.id}>
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options js-delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
              </div>
            </div>
      `

  });

  document.querySelector(".js-order-summary").innerHTML = html

  cart.CountItems()

  function deliveryOptionsHTML(matchingProduct, cartItem) {
      let html = ''
      deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(
          deliveryOption.deliveryDays, 'days'
        )
        const dateString = deliveryDate.format('dddd, MMMM D')
        
        const priceString = deliveryOption.priceCents === '0'
        ? 'FREE'
        : `$${deliveryOption.priceCents/100} -`


        const isChecked = deliveryOption.id === cartItem.deliveryOptionId

        
        html += `<div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
            <input type="radio" 
            ${isChecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
            </div>
          </div>
        </div>`

      })
      return html
  }

  if (cart.cartItems.length === 0) {
    html = `<p>You have no orders</p> <button class="buy-products-button button-primary js-buy-products">
            Buy some products
          </button>`
    
    document.querySelector(".js-order-summary").innerHTML = html

    document.querySelector(".js-buy-products").addEventListener('click', () => {
        window.location.href = '../../index.html'
    })

  }

 


  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener('click', () => {
      cart.removeFromCart(link.dataset.productId)
      
      renderPaymentSummary()

      if (cart.cartItems.length === 0) {

        document.querySelector(".js-order-summary").innerHTML = `<p>You have no orders</p> <button class="buy-products-button button-primary js-buy-products">
                Buy some products
              </button>`

        document.querySelector(".js-buy-products").addEventListener('click', () => {
            window.location.href = '../../index.html'
        })

      }


    })
  })

  document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      cart.updateCartItem(link, link.dataset.productId)
    })
  })



  document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      cart.saveQuantity(link.dataset.productId)
      renderOrderSummary();
      renderPaymentSummary();
    })

  })

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset
      cart.updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

}

