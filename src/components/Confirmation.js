import React from 'react';
import { useLocation } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();
  const cartData = location.state?.cartData || []; // 接收传递的数据

  return (
    <div>
      <h1>Order Confirmation</h1>
      <p>Your order has been successfully placed!</p>
      {cartData.length > 0 ? (
        <div>
          <h2>Order Details:</h2>
          <ul>
            {cartData.map((item, index) => (
              <li key={index}>
                {item.productName} (Quantity: {item.quantity}, Price: {item.price})
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No items in your order.</p>
      )}
    </div>
  );
};

export default Confirmation;
