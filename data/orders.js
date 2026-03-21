import { products, loadProductsFetch } from "./products.js";
import { formatCurrency } from "../scripts/utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'

const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function createOrderList() {
    const ordersgrid = document.querySelector('.js-order-grid')
    let ordershtml = ``
    
    console.log(orders.length)
    console.log(orders)

    orders.forEach((order) => {
       
        ordersgrid.innerHTML += `<div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dayjs(order.orderTime).format('MMMM D')}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid js-order-details-grid-${order.id}">
            

          </div>
        </div>`

        console.log(products)
        console.log(ordershtml)

        

        const productsgrid = document.querySelector(`.js-order-details-grid-${order.id}`)
        let productshtml = ``
        
        order.products.forEach((product) => {
            let matchingProduct;
            console.log('check')
            
            products.forEach((item) => {
                if (item.id === product.productId) {
                    
                    matchingProduct = item
                }
            });

            productshtml += `<div class="product-image-container">
              <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${dayjs(product.estimatedDeliveryTime).format('MMMM D')}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="http://127.0.0.1:5500/tracking.html?id=${product.productId}&name=${matchingProduct.name}&image=${matchingProduct.image}&quantity=${product.quantity}&date=${product.estimatedDeliveryTime}">
                <button class="track-package-button button-secondary js-track">
                  Track package
                </button>
              </a>
            </div>`
        });

        console.log(productshtml)
        productsgrid.innerHTML = productshtml;
    })
}

async function loadPage() {
    await loadProductsFetch()

    createOrderList()
}

loadPage()



