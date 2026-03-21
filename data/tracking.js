import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'


const url = new URLSearchParams(window.location.search)

const productId = url.get('id')
const productName = url.get('name')
const image = url.get('image')
const quantity = url.get('quantity')
let estimatedDeliveryTime = url.get('date')
console.log('works')

document.querySelector('.js-delivery-date').innerHTML = 'Arriving on ' + dayjs(estimatedDeliveryTime).format('dddd, MMMM D')
document.querySelector('.js-product-name').innerHTML = productName
document.querySelector('.js-product-quantity').innerHTML = 'Quantity: ' + quantity
document.querySelector('.js-product-image').src = image

