const axios = require('axios');

const data = {
    buyerId: '123',
    product1Quantity: 2,
    product2Quantity: 1,
    totalPrice: 100
};

axios.post('http://kokoa.bitter.jp:3000/receive', data)
    .then(response => {
        console.log('Successfully sent data:', response.data);
    })
    .catch(error => {
        console.error('Error sending data:', error);
    });