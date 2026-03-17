const xhr = new XMLHttpRequest();
let response;
xhr.addEventListener('load', () => {
    response = xhr.response
    console.log(response)

});

xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();

