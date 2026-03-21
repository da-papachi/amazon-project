import { products, loadProductsFetch } from '../data/products.js';
import {renderOrderSummary} from './checkout/orderSummary.js'
import {renderPaymentSummary} from './checkout/paymentSummary.js'
import { cart } from '../data/cart.js';
import '../data/cart-class.js';
/* import '../data/backend-practice.js' */

async function loadPage() {

    await loadProductsFetch();
    
    const value = await new Promise((resolve) => {

         cart.loadCart(() => {
            resolve('value3');
         });
    });

    
    renderOrderSummary();
    renderPaymentSummary();

    return 'value2'
};

loadPage().then((value) => {
    console.log(value)
})

/* Promise.all([

    loadProductsFetch(),

    new Promise((resolve) => {

         cart.loadCart(() => {
            resolve();
         });
    }),

]).then((values) => {
    console.log(values)
    renderOrderSummary();
    renderPaymentSummary();
});


 new Promise((resolve) => {
    console.log('start promise');
    loadProducts(() => {
        resolve('value1');
    })

}).then((value) => {
    return new Promise((resolve) => {
         cart.loadCart(() => {
            resolve();
         });

    });
    

}).then(() => {

    renderOrderSummary();
    renderPaymentSummary();

}); */ 



/* loadProducts(() => {
    cart.loadCart(() => {
        renderOrderSummary();
        renderPaymentSummary();
    })
}); */



