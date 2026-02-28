import { formatCurrency } from "../scripts/utils/money.js";

console.log('test suite: format currency')

console.log('converts of 0')

if (formatCurrency(0) === '0.00') 
    {
    console.log('passed') }
else {
    console.log('failed')
};

console.log('rounds up to the nearest zero')

if (formatCurrency(2000.5) === '20.01') 
    {
    console.log('passed') }
else {
    console.log('failed')
    console.log(formatCurrency(2000.5))
    
};


if (formatCurrency(2000.4) === '20.00') 
    {
    console.log('passed') }
else {
    console.log('failed')
};

console.log('end of the test')