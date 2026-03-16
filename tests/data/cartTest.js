
import {cart} from "../../data/cart.js"

describe('test suite addToCart', () => {
    beforeAll(() => {
        document.body.innerHTML += "<div class='test-container'></div>"
    })

    beforeEach(() => {
       document.querySelector('.test-container').innerHTML = `<input class="js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6">`
         document.querySelector('.js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').value = 1
    })

    afterEach(() => {
        console.log(cart)
         document.querySelector('.test-container').innerHTML = ''
    })

    it('add an existing product to the cart', () => {
       

        spyOn(localStorage, 'setItem').and.callFake(() => {
            return JSON.stringify([]);
        });

       spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {   productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 1,
                    deliveryOptionId: '1'
                }
            ]);
        });
        cart.loadFromStorage();

        cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.cartItems.length).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart.cartItems[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
        expect(cart.cartItems[0].quantity).toEqual(2)
        

        
    });

     it('adds a new product to the cart', () => {
        
        spyOn(localStorage, 'setItem').and.callFake(() => {
            return JSON.stringify([]);
        });

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        cart.loadFromStorage();

        console.log(cart.cartItems)
        cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.cartItems.length).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart.cartItems[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
        console.log(cart.cartItems)
        expect(cart.cartItems[0].quantity).toEqual(1)
    });
});