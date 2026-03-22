import {cart} from "../../data/cart.js";
import {products} from '../../data/products.js';
import { formatCurrency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import {deliveryOptions, GetDeliveryOption} from '../../data/deliveryOptions.js'

const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function renderPaymentSummary() {
    let html = ``;

    let itemsPrice = 0;
    let shoppingPrice = 0;
    let taxes = 0;

    cart.cartItems.forEach((cartItem) => {
        products.forEach((product) => {
            if (cartItem.productId === product.id) {
                itemsPrice += product.priceCents * cartItem.quantity;
            };
        });

        const deliveryOption = GetDeliveryOption(cartItem.deliveryOptionId);
        console.log(deliveryOption)
        shoppingPrice += Number(deliveryOption.priceCents)
        taxes = Math.floor((itemsPrice + shoppingPrice)/10)

    });

    html = `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.cartItems.length}):</div>
            <div class="payment-summary-money">$${formatCurrency(itemsPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shoppingPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(itemsPrice+shoppingPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxes)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(itemsPrice+shoppingPrice+taxes)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order-button">
            Place your order
          </button>`;

    document.querySelector('.js-payment-summary').innerHTML = html;

    if (cart.cartItems.length > 0) {
      document.querySelector('.js-place-order-button').addEventListener('click', () => {
        makeOrder()
      });
    } else {
      document.querySelector('.js-place-order-button').style.backgroundColor = 'rgb(146, 146, 146)'
      document.querySelector('.js-place-order-button').style.borderColor = 'rgb(94, 94, 94)'
    }

    

    console.log(JSON.parse(localStorage.getItem('orders')));
};

export async function makeOrder() {
  try {
    const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({cart: cart.cartItems})

        
    });

    const order = await response.json();
    addOrder(order)

    order.products.forEach((product) => {
      cart.removeFromCart(product.productId)
    })

  } catch {
    console.log('fuck')
  }
  
  window.location.href = 'orders.html'
}



function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
};


function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}
