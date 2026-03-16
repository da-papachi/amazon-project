import {products} from '../data/products.js'
import {cart} from '../data/cart.js'
import { formatCurrency } from './utils/money.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'

const productsGrid = document.querySelector('.js-products-grid')

products.forEach((Item, index) => {
  productsGrid.innerHTML = productsGrid.innerHTML + `
  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src=${Item.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${Item.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src=${Item.getStarsUrl()}>
            <div class="product-rating-count link-primary">
              ${Item.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${Item.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${Item.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${Item.extraInfoHTML() || ``}

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${Item.id}" 
          data-product-name="${Item.name}"
          data-product-image="${Item.image}"
          data-product-price="${Item.priceCents}" ">
            Add to Cart
          </button>
        </div>
  `
})

let CartQuantity = 0




CountQuantity()

function CountQuantity() {
  CartQuantity = 0
  cart.cartItems.forEach((cartItem) => {
    CartQuantity += cartItem.quantity;
  }) 
  document.querySelector('.js-cart-quantity').innerText = `${CartQuantity}`
}



document.querySelectorAll('.js-add-to-cart').forEach((button, index) => {

    button.addEventListener('click', () => {

      cart.addToCart(button.dataset.productId)
      CountQuantity()

    })

});