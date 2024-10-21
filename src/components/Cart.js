import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, setCart, calculateTotalPrice, discount, increaseQuantity, decreaseQuantity, sendCartData, purchasedItems }) => {
  const navigate = useNavigate(); // 初始化 useNavigate

  const handleSendOrder = () => {
    sendCartData(); // 调用 sendCartData 函数
    navigate('/confirmation', { state: { cart } }); // 在这里处理导航
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <h3>Items in Cart</h3>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price} x {item.quantity}
                <button onClick={() => decreaseQuantity(item)}>-</button>
                <button onClick={() => increaseQuantity(item)}>+</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <h3>Discount: {discount}</h3>
      <h3>Total: ${calculateTotalPrice()}</h3>
      {/* 如果购物车为空，禁用按钮 */}
      <button onClick={handleSendOrder} disabled={cart.length === 0}>
        Send Order
      </button>

      {purchasedItems.length > 0 && (
        <div>
          <h3>Purchased Items</h3>
          <ul>
            {purchasedItems.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Cart;
