import {cart, removeFromCart, saveQuantity, updateCartItem, CountItems, updateDeliveryOption} from "../../data/cart.js";
import {products} from '../../data/products.js';
import { formatCurrency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import {deliveryOptions, GetDeliveryOption} from '../../data/deliveryOptions.js'

export function renderPaymentSummary() {
    let html = ``;

    let itemsPrice = 0;
    let shoppingPrice = 0;
    let taxes = 0;

    cart.forEach((cartItem) => {
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
            <div>Items (${cart.length}):</div>
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

          <button class="place-order-button button-primary">
            Place your order
          </button>`;

    document.querySelector('.js-payment-summary').innerHTML = html;
};
